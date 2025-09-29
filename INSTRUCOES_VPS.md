# 🚀 Instruções para Deploy na VPS

## 📋 Pré-requisitos
- VPS com Apache/Nginx instalado
- Acesso SSH à VPS
- Domínio configurado (opcional)

## 🔧 Passo a Passo

### 1. Preparar Arquivos
```bash
# Na sua máquina local, compacte a pasta
zip -r loja-salles.zip .
```

### 2. Upload para VPS
```bash
# Via SCP
scp loja-salles.zip usuario@seu-ip:/var/www/html/

# Ou via SFTP
sftp usuario@seu-ip
put loja-salles.zip /var/www/html/
```

### 3. Configurar na VPS
```bash
# Conectar via SSH
ssh usuario@seu-ip

# Navegar para diretório web
cd /var/www/html

# Extrair arquivos
unzip loja-salles.zip

# Mover arquivos para raiz
mv loja-salles/* .
rm -rf loja-salles loja-salles.zip

# Definir permissões
chmod 755 .
chmod 644 *.html *.js *.json *.png *.txt
chmod 644 .htaccess
```

### 4. Configurar Apache (se necessário)
```bash
# Editar configuração do Apache
sudo nano /etc/apache2/sites-available/000-default.conf

# Adicionar:
<Directory /var/www/html>
    AllowOverride All
    Require all granted
</Directory>

# Reiniciar Apache
sudo systemctl restart apache2
```

### 5. Configurar Nginx (alternativa)
```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🔐 Credenciais de Acesso

### Usuários Configurados:
- **admin** / **admin123** (acesso completo + logout)
- **funcionaria1** / **func123** (acesso às páginas)
- **funcionaria2** / **func123** (acesso às páginas)
- **vendedora** / **vend123** (acesso às páginas)

### Para Alterar Senhas:
Edite o arquivo `index.html` na seção:
```javascript
const validCredentials = {
    'admin': 'admin123',
    'funcionaria1': 'func123',
    // Adicione mais usuários aqui
};
```

## 🌐 Acesso

### Com Domínio:
- **URL:** `https://seu-dominio.com`
- **Login:** `funcionaria1` / `func123`

### Sem Domínio (IP):
- **URL:** `http://SEU-IP`
- **Login:** `funcionaria1` / `func123`

## 🔒 Segurança

### 1. HTTPS (Recomendado)
```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-apache

# Obter certificado SSL
sudo certbot --apache -d seu-dominio.com
```

### 2. Firewall
```bash
# Configurar UFW
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

### 3. Backup
```bash
# Criar backup diário
sudo crontab -e

# Adicionar linha:
0 2 * * * tar -czf /backup/loja-salles-$(date +\%Y\%m\%d).tar.gz /var/www/html
```

## 📱 Funcionalidades

### Para Funcionárias:
- ✅ Visualizar preços de celulares
- ✅ Visualizar preços de games
- ✅ Visualizar preços de JBL
- ✅ Buscar produtos
- ✅ Ver estoque disponível
- ❌ Não acessam área administrativa

### Para Admin:
- ✅ Todas as funcionalidades das funcionárias
- ✅ Acesso à área administrativa
- ✅ Gerenciar produtos
- ✅ Importar via TXT
- ✅ Botão de logout

## 🛠️ Manutenção

### Atualizar Produtos:
1. Acesse como admin
2. Use a área administrativa
3. Ou importe arquivo TXT

### Logs de Acesso:
```bash
# Ver logs do Apache
sudo tail -f /var/log/apache2/access.log

# Ver logs de erro
sudo tail -f /var/log/apache2/error.log
```

## 📞 Suporte

### Problemas Comuns:
1. **Página não carrega:** Verificar se Apache está rodando
2. **Login não funciona:** Verificar JavaScript habilitado
3. **Produtos não aparecem:** Verificar localStorage no navegador

### Comandos Úteis:
```bash
# Status do Apache
sudo systemctl status apache2

# Reiniciar Apache
sudo systemctl restart apache2

# Verificar portas
sudo netstat -tlnp | grep :80
```
