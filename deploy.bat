@echo off
REM Script de deploy para Windows
REM Uso: deploy.bat usuario@ip-do-servidor

if "%1"=="" (
    echo Uso: deploy.bat usuario@ip-do-servidor
    echo Exemplo: deploy.bat root@192.168.1.100
    pause
    exit /b 1
)

set SERVER=%1
set REMOTE_DIR=/var/www/html

echo 🚀 Iniciando deploy para %SERVER%...

REM 1. Compactar arquivos locais
echo 📦 Compactando arquivos...
powershell -Command "Compress-Archive -Path '*.html','*.js','*.json','*.png','*.txt','.htaccess' -DestinationPath 'loja-salles.zip' -Force"

REM 2. Upload para servidor
echo ⬆️  Enviando arquivos para o servidor...
scp loja-salles.zip %SERVER%:/tmp/

REM 3. Executar comandos no servidor
echo 🔧 Configurando no servidor...
ssh %SERVER% "cd /var/www/html && if [ -f 'index.html' ]; then tar -czf backup-$(date +%%Y%%m%%d-%%H%%M%%S).tar.gz *.html *.js *.json *.png *.txt .htaccess 2>/dev/null || true; fi && unzip -o /tmp/loja-salles.zip && chmod 755 . && chmod 644 *.html *.js *.json *.png *.txt .htaccess 2>/dev/null || true && rm -f /tmp/loja-salles.zip && if systemctl is-active --quiet apache2; then systemctl reload apache2; echo ✅ Apache recarregado; fi && echo ✅ Deploy concluído!"

REM 4. Limpar arquivo local
del loja-salles.zip

echo 🎉 Deploy finalizado!
echo 🌐 Acesse: http://%SERVER:~-15%
echo 🔐 Login: funcionaria1 / func123
pause
