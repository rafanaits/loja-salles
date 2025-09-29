# 🌐 CONFIGURAÇÃO DOMÍNIO PRÓPRIO - sallesinformatica.com

## 🎯 OPÇÕES DISPONÍVEIS:

### 1. **NETLIFY + DOMÍNIO PRÓPRIO** (RECOMENDADO)
- ✅ **Gratuito** com Netlify
- ✅ **SSL automático** (HTTPS)
- ✅ **CDN global**
- ✅ **Deploy automático** do GitHub
- ✅ **Subdomínios** ilimitados

### 2. **VPS + DOMÍNIO PRÓPRIO**
- ✅ **Controle total**
- ✅ **Múltiplos sites**
- ✅ **Banco de dados próprio**
- ✅ **Email personalizado**

### 3. **HOSPEDAGEM COMPARTILHADA**
- ✅ **Mais barato**
- ✅ **Painel cPanel**
- ✅ **Email incluído**

---

## 🚀 OPÇÃO 1: NETLIFY + DOMÍNIO (RECOMENDADO)

### **Configuração no Netlify:**

#### **1. Acesse o Netlify:**
- **URL:** https://app.netlify.com/projects/loja-salles
- **Vá para:** Domain settings

#### **2. Adicione seu domínio:**
- **Custom domain:** `sallesinformatica.com`
- **Subdomain:** `loja.sallesinformatica.com` (opcional)

#### **3. Configure DNS:**
No seu provedor de domínio, adicione:
```
Tipo: CNAME
Nome: www
Valor: loja-salles.netlify.app

Tipo: A
Nome: @
Valor: 75.2.60.5
```

#### **4. SSL Automático:**
- ✅ **HTTPS** ativado automaticamente
- ✅ **Certificado** renovado automaticamente

---

## 🖥️ OPÇÃO 2: VPS + DOMÍNIO

### **Configuração Completa:**

#### **1. Servidor Web (Nginx/Apache):**
```bash
# Instalar Nginx
sudo apt update
sudo apt install nginx

# Configurar site
sudo nano /etc/nginx/sites-available/sallesinformatica.com
```

#### **2. Configuração Nginx:**
```nginx
server {
    listen 80;
    server_name sallesinformatica.com www.sallesinformatica.com;
    root /var/www/sallesinformatica.com;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

#### **3. SSL com Let's Encrypt:**
```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Obter certificado SSL
sudo certbot --nginx -d sallesinformatica.com -d www.sallesinformatica.com
```

#### **4. Banco de Dados:**
```bash
# Instalar PostgreSQL
sudo apt install postgresql postgresql-contrib

# Criar banco
sudo -u postgres createdb loja_salles
```

---

## 📧 EMAIL PERSONALIZADO

### **Com seu domínio:**
- **admin@sallesinformatica.com**
- **vendas@sallesinformatica.com**
- **suporte@sallesinformatica.com**

### **Configuração:**
```bash
# Instalar Postfix
sudo apt install postfix

# Configurar MX records no DNS
MX: mail.sallesinformatica.com
```

---

## 🔧 CONFIGURAÇÃO DNS COMPLETA

### **Registros DNS necessários:**
```
A     @            IP_DO_SERVIDOR
A     www          IP_DO_SERVIDOR
CNAME loja         loja-salles.netlify.app
CNAME admin        admin-salles.netlify.app
MX    @            mail.sallesinformatica.com
TXT   @            "v=spf1 include:_spf.google.com ~all"
```

---

## 🎯 RECOMENDAÇÃO FINAL

### **Para sua loja, recomendo:**

#### **1. Netlify + Domínio Próprio:**
- **URL:** https://sallesinformatica.com
- **Subdomínio:** https://loja.sallesinformatica.com
- **Admin:** https://admin.sallesinformatica.com

#### **2. Vantagens:**
- ✅ **Profissional** com domínio próprio
- ✅ **Gratuito** com Netlify
- ✅ **SSL automático**
- ✅ **CDN global**
- ✅ **Deploy automático**

#### **3. Próximos Passos:**
1. **Configure** DNS no seu provedor
2. **Adicione** domínio no Netlify
3. **Ative** SSL automático
4. **Teste** o site

---

## 🚀 QUER QUE EU CONFIGURE?

**Posso ajudar você a:**
- ✅ Configurar DNS
- ✅ Conectar domínio ao Netlify
- ✅ Criar subdomínios
- ✅ Configurar email
- ✅ Otimizar performance

**Qual opção você prefere?**
