// Firebase Backend para Loja Salles
// Sistema profissional com banco de dados real

// Configuração Firebase
const firebaseConfig = {
    apiKey: "sua-api-key",
    authDomain: "loja-salles.firebaseapp.com",
    projectId: "loja-salles",
    storageBucket: "loja-salles.appspot.com",
    messagingSenderId: "123456789",
    appId: "seu-app-id"
};

// Inicializar Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, addDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

class LojaSallesBackend {
    constructor() {
        this.productsCollection = collection(db, 'products');
        this.usersCollection = collection(db, 'users');
        this.settingsCollection = collection(db, 'settings');
    }

    // ===== PRODUTOS =====
    
    // Buscar todos os produtos
    async getProducts() {
        try {
            const snapshot = await getDocs(this.productsCollection);
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            return [];
        }
    }

    // Adicionar produto
    async addProduct(product) {
        try {
            const docRef = await addDoc(this.productsCollection, {
                ...product,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            return docRef.id;
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
            throw error;
        }
    }

    // Atualizar produto
    async updateProduct(productId, productData) {
        try {
            const productRef = doc(this.productsCollection, productId);
            await updateDoc(productRef, {
                ...productData,
                updatedAt: new Date()
            });
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            throw error;
        }
    }

    // Deletar produto
    async deleteProduct(productId) {
        try {
            await deleteDoc(doc(this.productsCollection, productId));
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            throw error;
        }
    }

    // Importar produtos em lote (TXT)
    async importProductsFromTxt(txtContent) {
        try {
            const lines = txtContent.split('\n');
            const products = [];
            
            for (const line of lines) {
                const product = this.parseProductLine(line);
                if (product) {
                    products.push(product);
                }
            }
            
            // Deletar produtos existentes
            const existingProducts = await this.getProducts();
            for (const product of existingProducts) {
                await this.deleteProduct(product.id);
            }
            
            // Adicionar novos produtos
            for (const product of products) {
                await this.addProduct(product);
            }
            
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
            const snapshot = await getDocs(this.usersCollection);
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            return [];
        }
    }

    // Criar usuário
    async createUser(userData) {
        try {
            const docRef = await addDoc(this.usersCollection, {
                ...userData,
                createdAt: new Date(),
                lastLogin: null
            });
            return docRef.id;
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    }

    // Atualizar usuário
    async updateUser(userId, userData) {
        try {
            const userRef = doc(this.usersCollection, userId);
            await updateDoc(userRef, {
                ...userData,
                updatedAt: new Date()
            });
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw error;
        }
    }

    // ===== CONFIGURAÇÕES =====
    
    // Buscar configurações
    async getSettings() {
        try {
            const snapshot = await getDocs(this.settingsCollection);
            const settings = {};
            snapshot.docs.forEach(doc => {
                settings[doc.id] = doc.data();
            });
            return settings;
        } catch (error) {
            console.error('Erro ao buscar configurações:', error);
            return {};
        }
    }

    // Salvar configurações
    async saveSettings(settings) {
        try {
            for (const [key, value] of Object.entries(settings)) {
                const settingRef = doc(this.settingsCollection, key);
                await updateDoc(settingRef, {
                    value: value,
                    updatedAt: new Date()
                });
            }
        } catch (error) {
            console.error('Erro ao salvar configurações:', error);
            throw error;
        }
    }

    // ===== AUTENTICAÇÃO =====
    
    // Login
    async login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Atualizar último login
            const users = await this.getUsers();
            const userData = users.find(u => u.email === email);
            if (userData) {
                await this.updateUser(userData.id, { lastLogin: new Date() });
            }
            
            return user;
        } catch (error) {
            console.error('Erro no login:', error);
            throw error;
        }
    }

    // Criar usuário
    async createUserAccount(email, password, userData) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Salvar dados adicionais
            await this.createUser({
                ...userData,
                email: email,
                uid: user.uid
            });
            
            return user;
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    }

    // ===== LISTENERS EM TEMPO REAL =====
    
    // Escutar mudanças nos produtos
    onProductsChange(callback) {
        return onSnapshot(this.productsCollection, (snapshot) => {
            const products = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            callback(products);
        });
    }

    // Escutar mudanças nos usuários
    onUsersChange(callback) {
        return onSnapshot(this.usersCollection, (snapshot) => {
            const users = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            callback(users);
        });
    }

    // ===== UTILITÁRIOS =====
    
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
}

// Instanciar backend
const backend = new LojaSallesBackend();

// Exportar para uso global
window.LojaSallesBackend = backend;
