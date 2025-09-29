# Script para configurar domínio próprio no Netlify
# Execute este script após configurar o DNS

echo "🌐 Configurando domínio sallesinformatica.com no Netlify..."

# Verificar se Netlify CLI está instalado
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI não encontrado. Instalando..."
    npm install -g netlify-cli
fi

# Fazer login no Netlify (se necessário)
echo "🔐 Fazendo login no Netlify..."
netlify login

# Listar sites
echo "📋 Listando sites..."
netlify sites:list

# Adicionar domínio personalizado
echo "🌐 Adicionando domínio sallesinformatica.com..."
netlify domains:add sallesinformatica.com

# Adicionar subdomínio www
echo "🌐 Adicionando subdomínio www.sallesinformatica.com..."
netlify domains:add www.sallesinformatica.com

# Adicionar subdomínio loja
echo "🌐 Adicionando subdomínio loja.sallesinformatica.com..."
netlify domains:add loja.sallesinformatica.com

# Adicionar subdomínio admin
echo "🌐 Adicionando subdomínio admin.sallesinformatica.com..."
netlify domains:add admin.sallesinformatica.com

# Verificar configuração
echo "✅ Verificando configuração..."
netlify domains:list

echo ""
echo "🎉 Configuração completa!"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure os registros DNS no seu provedor:"
echo "   CNAME www sallesinformatica.com"
echo "   CNAME loja sallesinformatica.com"
echo "   CNAME admin sallesinformatica.com"
echo ""
echo "2. Aguarde propagação DNS (5-30 minutos)"
echo ""
echo "3. Acesse seu site:"
echo "   https://sallesinformatica.com"
echo "   https://loja.sallesinformatica.com"
echo "   https://admin.sallesinformatica.com"
echo ""
echo "✅ SSL será ativado automaticamente!"
