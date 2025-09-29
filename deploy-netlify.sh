#!/bin/bash

# Script de deploy automático para Netlify
# Uso: ./deploy-netlify.sh

echo "🚀 Iniciando deploy para Netlify..."

# Verificar se Netlify CLI está instalado
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI não está instalado!"
    echo "📥 Instalando Netlify CLI..."
    
    # Tentar instalar via npm
    if command -v npm &> /dev/null; then
        npm install -g netlify-cli
    elif command -v yarn &> /dev/null; then
        yarn global add netlify-cli
    else
        echo "❌ npm ou yarn não encontrados!"
        echo "💡 Instale manualmente: npm install -g netlify-cli"
        exit 1
    fi
    
    if [ $? -ne 0 ]; then
        echo "❌ Erro ao instalar Netlify CLI"
        exit 1
    fi
fi

echo "✅ Netlify CLI encontrado!"

# Verificar se está logado
if ! netlify status &> /dev/null; then
    echo "🔐 Fazendo login no Netlify..."
    netlify login
    if [ $? -ne 0 ]; then
        echo "❌ Erro no login"
        exit 1
    fi
fi

echo "✅ Logado no Netlify!"

# Fazer deploy
echo "📤 Fazendo deploy..."
netlify deploy --prod --dir .

if [ $? -eq 0 ]; then
    echo "🎉 Deploy realizado com sucesso!"
    echo "🌐 Abrindo site..."
    netlify open
else
    echo "❌ Erro no deploy"
    echo "📋 Verificando logs..."
    netlify logs
fi
