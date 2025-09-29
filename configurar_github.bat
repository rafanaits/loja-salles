@echo off
echo 🚀 Configurando GitHub + Netlify para Deploy Automático
echo.

echo 📋 INSTRUÇÕES:
echo.
echo 1. Acesse: https://github.com/new
echo 2. Nome: loja-salles
echo 3. Descrição: Sistema de gestão de produtos da Loja Salles
echo 4. Público ✅
echo 5. Clique: "Create repository"
echo.
echo 6. Copie a URL do repositório (ex: https://github.com/seuusuario/loja-salles.git)
echo 7. Cole abaixo quando solicitado
echo.

set /p REPO_URL="Cole a URL do repositório GitHub: "

echo.
echo 🔄 Configurando Git...

git remote add origin %REPO_URL%
git branch -M main
git push -u origin main

echo.
echo ✅ Repositório configurado!
echo.
echo 🌐 Agora configure o Netlify:
echo 1. Acesse: https://app.netlify.com
echo 2. Clique: "New site from Git"
echo 3. Escolha: GitHub
echo 4. Selecione: loja-salles
echo 5. Deploy settings: (deixe tudo vazio)
echo 6. Deploy!
echo.
echo 🎉 Pronto! Agora qualquer push para GitHub = Deploy automático!
echo.
pause
