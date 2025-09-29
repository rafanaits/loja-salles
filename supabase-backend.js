// Configuração Supabase para Loja Salles
// Substitui o sistema de cache local por banco de dados real

import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js@2'

// Configuração do Supabase
const supabaseUrl = 'https://iywsgqemykvixxfijbzc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5d3NncWVteWt2aXh4ZmlqYnpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxODM1NzAsImV4cCI6MjA3NDc1OTU3MH0.BgVNWpUHQInn5d0mPe9B-9w5uW0HLr9FvO4h3QHWZuI'

const supabase = createClient(supabaseUrl, supabaseKey)

class SupabaseBackend {
    constructor() {
        this.client = supabase;
    }

    // ===== PRODUTOS =====
    
    // Buscar todos os produtos
    async getProducts() {
        try {
            const { data, error } = await this.client
                .from('products')
                .select('*')
                .order('category', { ascending: true })
                .order('model', { ascending: true });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            return [];
        }
    }

    // Adicionar produto
    async addProduct(product) {
        try {
            const { data, error } = await this.client
                .from('products')
                .insert([{
                    ...product,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }])
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
            throw error;
        }
    }

    // Atualizar produto
    async updateProduct(id, product) {
        try {
            const { data, error } = await this.client
                .from('products')
                .update({
                    ...product,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id)
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            throw error;
        }
    }

    // Deletar produto
    async deleteProduct(id) {
        try {
            const { error } = await this.client
                .from('products')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            throw error;
        }
    }

    // Importar produtos em lote (TXT)
    async importProductsFromTxt(txtContent) {
        try {
            // Parsear TXT
            const lines = txtContent.split('\n');
            const products = [];
            
            for (const line of lines) {
                const product = this.parseProductLine(line);
                if (product) {
                    products.push(product);
                }
            }
            
            // Deletar produtos existentes
            const { error: deleteError } = await this.client
                .from('products')
                .delete()
                .neq('id', 0); // Deletar todos
            
            if (deleteError) throw deleteError;
            
            // Adicionar novos produtos
            const { data, error } = await this.client
                .from('products')
                .insert(products.map(product => ({
                    ...product,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                })))
                .select();
            
            if (error) throw error;
            return products.length;
        } catch (error) {
            console.error('Erro ao importar produtos:', error);
            throw error;
        }
    }

    // ===== USUÁRIOS =====
    
    // Buscar usuários
    async getUsers() {
        try {
            const { data, error } = await this.client
                .from('users')
                .select('id, username, email, role, last_login, created_at');
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            return [];
        }
    }

    // Criar usuário
    async createUser(user) {
        try {
            const { data, error } = await this.client
                .from('users')
                .insert([{
                    ...user,
                    created_at: new Date().toISOString()
                }])
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    }

    // Atualizar usuário
    async updateUser(id, user) {
        try {
            const { data, error } = await this.client
                .from('users')
                .update({
                    ...user,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id)
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw error;
        }
    }

    // Deletar usuário
    async deleteUser(id) {
        try {
            const { error } = await this.client
                .from('users')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            throw error;
        }
    }

    // ===== LISTENERS EM TEMPO REAL =====
    
    // Escutar mudanças nos produtos
    onProductsChange(callback) {
        return this.client
            .channel('products')
            .on('postgres_changes', 
                { event: '*', schema: 'public', table: 'products' },
                (payload) => {
                    console.log('🔄 Produtos atualizados:', payload);
                    callback(payload);
                }
            )
            .subscribe();
    }

    // Escutar mudanças nos usuários
    onUsersChange(callback) {
        return this.client
            .channel('users')
            .on('postgres_changes', 
                { event: '*', schema: 'public', table: 'users' },
                (payload) => {
                    console.log('👥 Usuários atualizados:', payload);
                    callback(payload);
                }
            )
            .subscribe();
    }

    // ===== FUNÇÕES UTILITÁRIAS =====
    
    // Parsear linha do produto
    parseProductLine(line) {
        if (!line || line.trim() === '') return null;
        
        const parts = line.trim().split(/\s+/);
        if (parts.length < 4) return null;
        
        const quantity = parseInt(parts[0]) || 0;
        const price = parseInt(parts[parts.length - 1]) || 0;
        
        const middleParts = parts.slice(1, -1);
        let model = '';
        let storage = 'N/A';
        let ram = 'N/A';
        let color = 'N/A';
        
        for (let i = 0; i < middleParts.length; i++) {
            const part = middleParts[i].toLowerCase();
            
            if (['preto', 'azul', 'verde', 'gold', 'pink', 'roxo', 'silver', 'branco', 'laranja', 'dourado', 'camuflado'].includes(part)) {
                color = middleParts[i];
            } else if (part.includes('/') || part.includes('gb') || part.includes('tb')) {
                storage = middleParts[i];
                ram = this.extractRamFromStorage(middleParts[i]);
            } else {
                model += (model ? ' ' : '') + middleParts[i];
            }
        }
        
        if (color === 'N/A' && middleParts.length > 0) {
            const lastPart = middleParts[middleParts.length - 1];
            if (!/^\d+$/.test(lastPart)) {
                color = lastPart;
            }
        }
        
        const category = this.extractCategory(model);
        const normalizedModel = this.normalizeModel(model);
        
        return {
            category: category,
            model: normalizedModel,
            storage: storage,
            ram: ram,
            color: color,
            price: price,
            quantity: quantity,
            status: quantity > 0 ? 'disponivel' : 'indisponivel'
        };
    }

    extractCategory(model) {
        const modelLower = model.toLowerCase();
        
        if (modelLower.includes('redmi')) return 'Redmi';
        if (modelLower.includes('note')) return 'Note';
        if (modelLower.includes('poco')) return 'Poco';
        if (modelLower.includes('realme')) return 'Realme';
        if (modelLower.includes('starlink')) return 'Starlink';
        if (modelLower.includes('serie') || modelLower.includes('série')) return 'Apple Watch';
        if (modelLower.includes('playstation')) return 'PlayStation';
        if (modelLower.includes('jbl') || modelLower.includes('boombox') || modelLower.includes('party box')) return 'JBL';
        
        return 'Outros';
    }

    extractRamFromStorage(storage) {
        if (!storage || storage === 'N/A') return 'N/A';
        
        const parts = storage.split('/');
        if (parts.length >= 2) {
            return parts[1] + 'GB';
        }
        
        const ramMatch = storage.match(/(\d+)\s*gb/i);
        if (ramMatch) {
            return ramMatch[1] + 'GB';
        }
        
        return 'N/A';
    }

    normalizeModel(model) {
        if (!model) return model;
        
        let normalized = model.toLowerCase().trim();
        normalized = normalized.replace(/\s+/g, ' ');
        normalized = normalized.replace(/\s+5g\s*/g, ' 5g');
        normalized = normalized.replace(/\s+pro\s*/g, ' pro');
        normalized = normalized.replace(/\s+plus\s*/g, ' plus');
        
        normalized = normalized.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        return normalized;
    }

    // ===== FUNÇÕES DE COMPATIBILIDADE =====
    
    // Compatibilidade com o sistema atual
    async loadData() {
        return await this.getProducts();
    }

    // Forçar atualização
    async forceUpdate() {
        console.log('🔄 Forçando atualização do banco de dados...');
        return await this.getProducts();
    }

    // Limpar cache (não necessário com Supabase)
    clearCache() {
        console.log('🗑️ Cache limpo (Supabase gerencia automaticamente)');
    }
}

// Instanciar backend
const backend = new SupabaseBackend();

// Compatibilidade com sistema atual
window.smartCache = backend;
window.backend = backend;

// Funções globais para compatibilidade
window.forceUpdateCache = () => {
    backend.forceUpdate().then(() => {
        location.reload();
    });
};

window.clearAllCache = () => {
    backend.clearCache();
    location.reload();
};

console.log('🚀 Supabase Backend carregado!');
console.log('📱 Loja Salles com banco de dados real!');