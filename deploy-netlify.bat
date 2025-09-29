@echo off
REM Script de deploy automático para Netlify
REM Uso: deploy-netlify.bat

echo 🚀 Iniciando deploy para Netlify...

REM Verificar se Netlify CLI está instalado
netlify --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Netlify CLI não está instalado!
    echo 📥 Instalando Netlify CLI...
    npm install -g netlify-cli
    if %errorlevel% neq 0 (
        echo ❌ Erro ao instalar Netlify CLI
        echo 💡 Instale manualmente: npm install -g netlify-cli
        pause
        exit /b 1
    )
)

echo ✅ Netlify CLI encontrado!

REM Verificar se está logado
netlify status >nul 2>&1
if %errorlevel% neq 0 (
    echo 🔐 Fazendo login no Netlify...
    netlify login
    if %errorlevel% neq 0 (
        echo ❌ Erro no login
        pause
        exit /b 1
    )
)

echo ✅ Logado no Netlify!

REM Fazer deploy
echo 📤 Fazendo deploy...
netlify deploy --prod --dir .

if %errorlevel% equ 0 (
    echo 🎉 Deploy realizado com sucesso!
    echo 🌐 Abrindo site...
    netlify open
) else (
    echo ❌ Erro no deploy
    echo 📋 Verificando logs...
    netlify logs
)

pause
