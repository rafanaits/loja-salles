# 🚀 Deploy no Netlify - Loja Salles

## 📋 Pré-requisitos
- Conta no Netlify (gratuita)
- Arquivos da loja preparados
- Conexão com internet

## 🔧 Passo a Passo Detalhado

### **Opção 1: Deploy Manual (Mais Fácil)**

#### 1. Preparar Arquivos
```
✅ Arquivos necessários:
- index.html (página de login)
- precos_celulares.html (página principal)
- games.html (página de games)
- jbl.html (página JBL)
- admin.html (área administrativa)
- auth.js (sistema de autenticação)
- logoloja.png (logo da loja)
- .htaccess (configurações)
```

#### 2. Acessar Netlify
1. Vá para [netlify.com](https://netlify.com)
2. Clique em "Sign up" (criar conta)
3. Use email ou GitHub para criar conta

#### 3. Fazer Deploy
1. Na dashboard, clique em "Add new site"
2. Selecione "Deploy manually"
3. **Arraste e solte** toda a pasta da loja
4. Aguarde o processamento (1-2 minutos)

#### 4. Configurar Site
1. **Nome do site:** `loja-salles` (ou escolha outro)
2. **URL:** `https://loja-salles.netlify.app`
3. **Configurações:** Deixar padrão

### **Opção 2: Deploy via GitHub (Recomendado)**

#### 1. Criar Repositório GitHub
1. Acesse [github.com](https://github.com)
2. Clique em "New repository"
3. Nome: `loja-salles`
4. Marque "Public"
5. Clique "Create repository"

#### 2. Upload dos Arquivos
1. **Via GitHub Web:**
   - Clique "uploading an existing file"
   - Arraste todos os arquivos
   - Commit: "Initial commit"
   - Clique "Commit changes"

2. **Via Git (se tiver instalado):**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/loja-salles.git
git push -u origin main
```

#### 3. Conectar Netlify ao GitHub
1. No Netlify, clique "Add new site"
2. Selecione "Import an existing project"
3. Escolha "GitHub"
4. Autorize o Netlify
5. Selecione o repositório `loja-salles`
6. Clique "Deploy site"

### **Opção 3: Deploy via CLI**

#### 1. Instalar Netlify CLI
```bash
# Via npm (Node.js)
npm install -g netlify-cli

# Via yarn
yarn global add netlify-cli
```

#### 2. Login e Deploy
```bash
# Login no Netlify
netlify login

# Deploy
netlify deploy --prod --dir .
```

## ⚙️ Configurações Importantes

### **1. Configurações de Build**
Criar arquivo `netlify.toml` na raiz:
```toml
[build]
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### **2. Configurações de Segurança**
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### **3. Configurações de Cache**
```toml
[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "*.png"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

## 🔐 Configurações de Acesso

### **1. Domínio Personalizado (Opcional)**
1. No Netlify, vá em "Domain settings"
2. Clique "Add custom domain"
3. Digite seu domínio
4. Configure DNS conforme instruções

### **2. HTTPS Automático**
- ✅ **Gratuito** no Netlify
- ✅ **Automático** para todos os sites
- ✅ **Renovação** automática

### **3. Configurações de Acesso**
- **URL pública:** `https://loja-salles.netlify.app`
- **Login admin:** `admin` / `admin123`
- **Login funcionária:** `funcionaria1` / `func123`

## 📱 Teste do Deploy

### **1. Verificar Funcionalidades**
- [ ] Página de login carrega
- [ ] Login funciona
- [ ] Páginas de produtos carregam
- [ ] Área administrativa acessível
- [ ] Gerenciamento de usuários funciona

### **2. Teste em Dispositivos**
- [ ] Desktop (Chrome, Firefox, Edge)
- [ ] Mobile (Android, iOS)
- [ ] Tablet

### **3. Teste de Performance**
- [ ] Carregamento rápido
- [ ] Imagens otimizadas
- [ ] Responsividade

## 🚨 Problemas Comuns

### **1. "Site não carrega"**
- Verificar se todos os arquivos foram enviados
- Verificar se `index.html` está na raiz
- Verificar logs de build no Netlify

### **2. "Login não funciona"**
- Verificar se `auth.js` foi enviado
- Verificar console do navegador
- Testar em modo incógnito

### **3. "Páginas não encontradas"**
- Verificar configurações de redirect
- Verificar se arquivos estão na raiz
- Verificar configurações do `netlify.toml`

## 📞 Suporte

### **Netlify Support**
- **Documentação:** [docs.netlify.com](https://docs.netlify.com)
- **Community:** [community.netlify.com](https://community.netlify.com)
- **Status:** [status.netlify.com](https://status.netlify.com)

### **Comandos Úteis**
```bash
# Ver status do deploy
netlify status

# Ver logs
netlify logs

# Abrir site
netlify open

# Ver configurações
netlify sites:list
```

## 🎉 Após o Deploy

### **1. Compartilhar com Funcionárias**
- **URL:** `https://loja-salles.netlify.app`
- **Login:** `funcionaria1` / `func123`
- **Instruções:** Enviar por WhatsApp/email

### **2. Monitoramento**
- **Analytics:** Netlify Analytics (gratuito)
- **Uptime:** 99.9% garantido
- **Backup:** Automático

### **3. Atualizações**
- **Via GitHub:** Push automático
- **Via Netlify:** Drag & drop
- **Via CLI:** `netlify deploy --prod`
