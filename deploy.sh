#!/bin/bash

# Script de deploy automático para VPS
# Uso: ./deploy.sh usuario@ip-do-servidor

if [ $# -eq 0 ]; then
    echo "Uso: ./deploy.sh usuario@ip-do-servidor"
    echo "Exemplo: ./deploy.sh root@192.168.1.100"
    exit 1
fi

SERVER=$1
REMOTE_DIR="/var/www/html"
LOCAL_DIR="."

echo "🚀 Iniciando deploy para $SERVER..."

# 1. Compactar arquivos locais
echo "📦 Compactando arquivos..."
zip -r loja-salles.zip . -x "*.git*" "deploy.sh" "INSTRUCOES_VPS.md"

# 2. Upload para servidor
echo "⬆️  Enviando arquivos para o servidor..."
scp loja-salles.zip $SERVER:/tmp/

# 3. Executar comandos no servidor
echo "🔧 Configurando no servidor..."
ssh $SERVER << 'EOF'
    # Navegar para diretório web
    cd /var/www/html
    
    # Backup dos arquivos atuais
    if [ -f "index.html" ]; then
        tar -czf backup-$(date +%Y%m%d-%H%M%S).tar.gz *.html *.js *.json *.png *.txt .htaccess 2>/dev/null || true
    fi
    
    # Extrair novos arquivos
    unzip -o /tmp/loja-salles.zip
    
    # Definir permissões
    chmod 755 .
    chmod 644 *.html *.js *.json *.png *.txt .htaccess 2>/dev/null || true
    
    # Limpar arquivo temporário
    rm -f /tmp/loja-salles.zip
    
    # Reiniciar Apache se estiver rodando
    if systemctl is-active --quiet apache2; then
        systemctl reload apache2
        echo "✅ Apache recarregado"
    fi
    
    echo "✅ Deploy concluído!"
EOF

# 4. Limpar arquivo local
rm -f loja-salles.zip

echo "🎉 Deploy finalizado!"
echo "🌐 Acesse: http://$(echo $SERVER | cut -d'@' -f2)"
echo "🔐 Login: funcionaria1 / func123"
