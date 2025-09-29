// hostgator-backend.js
// Backend para HostGator com MySQL

class HostGatorBackend {
    constructor() {
        this.apiUrl = '/api/'; // URLs relativas para o servidor
        this.isConnected = false;
    }

    // Testar conexão
    async testConnection() {
        try {
            const response = await fetch(this.apiUrl + 'test');
            const data = await response.json();
            this.isConnected = data.success;
            return this.isConnected;
        } catch (error) {
            console.error('Erro de conexão:', error);
            return false;
        }
    }

    // Obter produtos
    async getProducts() {
        try {
            const response = await fetch(this.apiUrl + 'products');
            if (!response.ok) throw new Error('Erro ao carregar produtos');
            const data = await response.json();
            return data.products || [];
        } catch (error) {
            console.error('Erro ao obter produtos:', error);
            return [];
        }
    }

    // Adicionar produto
    async addProduct(product) {
        try {
            const response = await fetch(this.apiUrl + 'products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product)
            });
            
            if (!response.ok) throw new Error('Erro ao adicionar produto');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
            throw error;
        }
    }

    // Atualizar produto
    async updateProduct(id, updates) {
        try {
            const response = await fetch(this.apiUrl + 'products/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates)
            });
            
            if (!response.ok) throw new Error('Erro ao atualizar produto');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            throw error;
        }
    }

    // Deletar produto
    async deleteProduct(id) {
        try {
            const response = await fetch(this.apiUrl + 'products/' + id, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Erro ao deletar produto');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            throw error;
        }
    }

    // Obter usuários
    async getUsers() {
        try {
            const response = await fetch(this.apiUrl + 'users');
            if (!response.ok) throw new Error('Erro ao carregar usuários');
            const data = await response.json();
            return data.users || [];
        } catch (error) {
            console.error('Erro ao obter usuários:', error);
            return [];
        }
    }

    // Adicionar usuário
    async addUser(user) {
        try {
            const response = await fetch(this.apiUrl + 'users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });
            
            if (!response.ok) throw new Error('Erro ao adicionar usuário');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
            throw error;
        }
    }

    // Atualizar senha do usuário
    async updateUserPassword(username, newPassword) {
        try {
            const response = await fetch(this.apiUrl + 'users/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password: newPassword })
            });
            
            if (!response.ok) throw new Error('Erro ao atualizar senha');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao atualizar senha:', error);
            throw error;
        }
    }

    // Deletar usuário
    async deleteUser(id) {
        try {
            const response = await fetch(this.apiUrl + 'users/' + id, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Erro ao deletar usuário');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            throw error;
        }
    }

    // Obter configurações
    async getSettings() {
        try {
            const response = await fetch(this.apiUrl + 'settings');
            if (!response.ok) throw new Error('Erro ao carregar configurações');
            const data = await response.json();
            return data.settings || {};
        } catch (error) {
            console.error('Erro ao obter configurações:', error);
            return {};
        }
    }

    // Salvar configurações
    async saveSettings(settings) {
        try {
            const response = await fetch(this.apiUrl + 'settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(settings)
            });
            
            if (!response.ok) throw new Error('Erro ao salvar configurações');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao salvar configurações:', error);
            throw error;
        }
    }

    // Importar produtos em lote
    async importProducts(products) {
        try {
            const response = await fetch(this.apiUrl + 'products/import', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ products })
            });
            
            if (!response.ok) throw new Error('Erro ao importar produtos');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao importar produtos:', error);
            throw error;
        }
    }

    // Backup dos dados
    async backupData() {
        try {
            const response = await fetch(this.apiUrl + 'backup');
            if (!response.ok) throw new Error('Erro ao fazer backup');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao fazer backup:', error);
            throw error;
        }
    }
}

// Criar instância global
const backend = new HostGatorBackend();

// Funções globais para compatibilidade
window.backend = backend;
window.getProducts = () => backend.getProducts();
window.addProduct = (product) => backend.addProduct(product);
window.updateProduct = (id, updates) => backend.updateProduct(id, updates);
window.deleteProduct = (id) => backend.deleteProduct(id);
window.getUsers = () => backend.getUsers();
window.addUser = (user) => backend.addUser(user);
window.updateUserPassword = (username, password) => backend.updateUserPassword(username, password);
window.deleteUser = (id) => backend.deleteUser(id);
window.getSettings = () => backend.getSettings();
window.saveSettings = (settings) => backend.saveSettings(settings);
window.importProducts = (products) => backend.importProducts(products);
window.backupData = () => backend.backupData();

console.log('🚀 HostGator Backend carregado!');
console.log('💡 Backend configurado para MySQL no HostGator');
