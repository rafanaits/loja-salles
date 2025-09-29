@echo off
REM Script de deploy automático
echo 🔄 Fazendo deploy automático...

netlify deploy --prod

if %errorlevel% equ 0 (
    echo ✅ Deploy realizado com sucesso!
    echo 🌐 Site atualizado: https://loja-salles.netlify.app
) else (
    echo ❌ Erro no deploy
)

pause
