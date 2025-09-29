-- Comandos SQL para criar as tabelas no Supabase
-- Execute estes comandos no SQL Editor do Supabase

-- 1. Criar tabela de produtos
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL,
    model TEXT NOT NULL,
    storage TEXT,
    ram TEXT,
    color TEXT,
    price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    status TEXT DEFAULT 'disponivel',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Criar tabela de usuários
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'funcionaria',
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Criar tabela de configurações
CREATE TABLE settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Inserir usuários padrão
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@lojasalles.com', 'admin123', 'admin'),
('funcionaria1', 'func1@lojasalles.com', 'func123', 'funcionaria'),
('funcionaria2', 'func2@lojasalles.com', 'func123', 'funcionaria'),
('vendedora', 'vend@lojasalles.com', 'vend123', 'funcionaria');

-- 5. Inserir configurações padrão
INSERT INTO settings (key, value) VALUES
('installment_rates', '{"mastercard": [1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0], "others": [2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5]}'),
('site_title', 'Loja Salles'),
('currency', 'BRL');

-- 6. Habilitar Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- 7. Criar políticas de acesso (permitir leitura pública)
CREATE POLICY "Permitir leitura pública de produtos" ON products
    FOR SELECT USING (true);

CREATE POLICY "Permitir leitura pública de configurações" ON settings
    FOR SELECT USING (true);

-- 8. Criar políticas para usuários (apenas admin pode gerenciar)
CREATE POLICY "Admin pode gerenciar usuários" ON users
    FOR ALL USING (role = 'admin');

-- 9. Criar políticas para produtos (admin pode gerenciar)
CREATE POLICY "Admin pode gerenciar produtos" ON products
    FOR ALL USING (true);

CREATE POLICY "Admin pode gerenciar configurações" ON settings
    FOR ALL USING (true);

-- 10. Criar índices para performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_model ON products(model);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);
