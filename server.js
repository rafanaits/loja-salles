// Backend Node.js + Express para Loja Salles
// Servidor próprio com banco de dados

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Banco de dados SQLite
const db = new sqlite3.Database('loja_salles.db');

// Criar tabelas
db.serialize(() => {
    // Tabela de produtos
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        model TEXT NOT NULL,
        storage TEXT,
        ram TEXT,
        color TEXT,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        status TEXT DEFAULT 'disponivel',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Tabela de usuários
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'funcionaria',
        last_login DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Tabela de configurações
    db.run(`CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

// ===== ROTAS DE PRODUTOS =====

// Buscar todos os produtos
app.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products ORDER BY category, model', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Buscar produto por ID
app.get('/api/products/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Produto não encontrado' });
            return;
        }
        res.json(row);
    });
});

// Adicionar produto
app.post('/api/products', (req, res) => {
    const { category, model, storage, ram, color, price, quantity } = req.body;
    
    db.run(
        'INSERT INTO products (category, model, storage, ram, color, price, quantity) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [category, model, storage, ram, color, price, quantity],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID, message: 'Produto adicionado com sucesso' });
        }
    );
});

// Atualizar produto
app.put('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const { category, model, storage, ram, color, price, quantity, status } = req.body;
    
    db.run(
        'UPDATE products SET category = ?, model = ?, storage = ?, ram = ?, color = ?, price = ?, quantity = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [category, model, storage, ram, color, price, quantity, status, id],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ message: 'Produto atualizado com sucesso' });
        }
    );
});

// Deletar produto
app.delete('/api/products/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Produto deletado com sucesso' });
    });
});

// Importar produtos em lote
app.post('/api/products/import', (req, res) => {
    const { txtContent } = req.body;
    
    try {
        // Parsear TXT
        const lines = txtContent.split('\n');
        const products = [];
        
        for (const line of lines) {
            const product = parseProductLine(line);
            if (product) {
                products.push(product);
            }
        }
        
        // Limpar produtos existentes
        db.run('DELETE FROM products', (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            
            // Inserir novos produtos
            const stmt = db.prepare('INSERT INTO products (category, model, storage, ram, color, price, quantity) VALUES (?, ?, ?, ?, ?, ?, ?)');
            
            products.forEach(product => {
                stmt.run([product.category, product.model, product.storage, product.ram, product.color, product.price, product.quantity]);
            });
            
            stmt.finalize();
            res.json({ message: `${products.length} produtos importados com sucesso` });
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ===== ROTAS DE USUÁRIOS =====

// Buscar usuários
app.get('/api/users', (req, res) => {
    db.all('SELECT id, username, email, role, last_login, created_at FROM users', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Criar usuário
app.post('/api/users', async (req, res) => {
    const { username, email, password, role } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        db.run(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, role],
            function(err) {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.json({ id: this.lastID, message: 'Usuário criado com sucesso' });
            }
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        if (!user) {
            res.status(401).json({ error: 'Usuário não encontrado' });
            return;
        }
        
        try {
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                res.status(401).json({ error: 'Senha incorreta' });
                return;
            }
            
            // Atualizar último login
            db.run('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [user.id]);
            
            // Gerar token JWT
            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                'seu-jwt-secret',
                { expiresIn: '24h' }
            );
            
            res.json({
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
});

// ===== FUNÇÕES UTILITÁRIAS =====

function parseProductLine(line) {
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
            ram = extractRamFromStorage(middleParts[i]);
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
    
    const category = extractCategory(model);
    const normalizedModel = normalizeModel(model);
    
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

function extractCategory(model) {
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

function extractRamFromStorage(storage) {
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

function normalizeModel(model) {
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

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📱 Loja Salles Backend ativo!`);
});

module.exports = app;
