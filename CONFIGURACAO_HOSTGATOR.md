# 🎉 CONFIGURAÇÃO HOSTGATOR - sallesinformatica.com

## ✅ VOCÊ JÁ TEM TUDO PRECISO!

### **📋 O que você tem:**
- ✅ **Domínio:** sallesinformatica.com
- ✅ **Hospedagem:** HostGator (Plano M)
- ✅ **cPanel:** Disponível
- ✅ **Email:** Configurável
- ✅ **Banco MySQL:** Incluído
- ✅ **SSL:** Disponível

---

## 🚀 CONFIGURAÇÃO COMPLETA HOSTGATOR

### **1. ACESSAR cPANEL:**
- **URL:** https://sallesinformatica.com/cpanel
- **Login:** Seu usuário HostGator
- **Senha:** Sua senha HostGator

### **2. CRIAR BANCO DE DADOS:**
```sql
-- No cPanel → MySQL Databases
Nome do banco: loja_salles
Usuário: admin_loja
Senha: [sua_senha_segura]
```

### **3. UPLOAD DOS ARQUIVOS:**
- **cPanel → File Manager**
- **Pasta:** public_html
- **Upload:** Todos os arquivos HTML

### **4. CONFIGURAR EMAIL:**
- **cPanel → Email Accounts**
- **Criar:** admin@sallesinformatica.com
- **Criar:** vendas@sallesinformatica.com
- **Criar:** suporte@sallesinformatica.com

---

## 🔧 SCRIPT DE CONFIGURAÇÃO AUTOMÁTICA

### **Arquivo: configurar-hostgator.php**
```php
<?php
// Configuração automática para HostGator
$host = 'localhost';
$dbname = 'admin_loja_loja_salles'; // Formato HostGator
$username = 'admin_loja';
$password = 'SUA_SENHA_AQUI';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Criar tabelas
    $sql = "
    CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(50) NOT NULL,
        model VARCHAR(100) NOT NULL,
        storage VARCHAR(20),
        ram VARCHAR(20),
        color VARCHAR(30),
        price DECIMAL(10,2) NOT NULL,
        quantity INT DEFAULT 0,
        status VARCHAR(20) DEFAULT 'disponivel',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'funcionaria',
        last_login TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(50) UNIQUE NOT NULL,
        setting_value TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    ";
    
    $pdo->exec($sql);
    echo "✅ Tabelas criadas com sucesso!";
    
} catch(PDOException $e) {
    echo "❌ Erro: " . $e->getMessage();
}
?>
```

---

## 📁 ESTRUTURA DE ARQUIVOS HOSTGATOR

### **Pasta: public_html/**
```
public_html/
├── index.html (página principal)
├── loja.html (loja de produtos)
├── admin.html (área administrativa)
├── games.html (jogos)
├── jbl.html (JBL)
├── pecas_reparo.html (peças)
├── configurar-hostgator.php
├── css/
│   └── style.css
├── js/
│   ├── auth.js
│   ├── hostgator-backend.js
│   └── main.js
└── imagens_produtos/
    ├── Apple Watch/
    ├── Honor/
    ├── Infinix/
    └── ...
```

---

## 🌐 URLs FINAIS

### **Com seu domínio:**
- **https://sallesinformatica.com** (site principal)
- **https://sallesinformatica.com/loja.html** (loja)
- **https://sallesinformatica.com/admin.html** (admin)
- **https://sallesinformatica.com/games.html** (games)
- **https://sallesinformatica.com/jbl.html** (JBL)

---

## 📧 EMAIL PROFISSIONAL

### **Configuração no cPanel:**
1. **Email Accounts** → **Create**
2. **Email:** admin@sallesinformatica.com
3. **Password:** [senha segura]
4. **Mailbox Quota:** 1000 MB

### **Emails sugeridos:**
- **admin@sallesinformatica.com**
- **vendas@sallesinformatica.com**
- **suporte@sallesinformatica.com**
- **contato@sallesinformatica.com**

---

## 🔒 SSL E SEGURANÇA

### **Ativar SSL:**
1. **cPanel → SSL/TLS**
2. **Let's Encrypt** → **Issue**
3. **Domain:** sallesinformatica.com
4. **✅ HTTPS ativado**

---

## 🚀 VANTAGENS HOSTGATOR

### **✅ PROFISSIONAL:**
- **Domínio próprio** funcionando
- **Email personalizado**
- **SSL gratuito**
- **Banco MySQL**

### **✅ TÉCNICO:**
- **cPanel** fácil de usar
- **File Manager** para upload
- **Backup automático**
- **Suporte técnico**

### **✅ NEGÓCIO:**
- **Credibilidade** máxima
- **SEO** otimizado
- **Velocidade** boa
- **Uptime** garantido

---

## 🎯 PRÓXIMOS PASSOS

### **1. ACESSAR cPANEL:**
- **URL:** https://sallesinformatica.com/cpanel
- **Login:** Seus dados HostGator

### **2. CRIAR BANCO:**
- **MySQL Databases** → **Create Database**
- **Nome:** loja_salles

### **3. UPLOAD ARQUIVOS:**
- **File Manager** → **public_html**
- **Upload** todos os arquivos

### **4. CONFIGURAR EMAIL:**
- **Email Accounts** → **Create**
- **admin@sallesinformatica.com**

**Vamos configurar tudo no seu HostGator!** 🚀
