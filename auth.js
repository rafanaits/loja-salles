// Sistema de autenticação para todas as páginas
(function() {
    'use strict';
    
    // Carregar usuários do localStorage
    function loadUsers() {
        return JSON.parse(localStorage.getItem('users')) || [
            { username: 'admin', password: 'admin123', role: 'admin', lastLogin: null },
            { username: 'funcionaria1', password: 'func123', role: 'funcionaria', lastLogin: null },
            { username: 'funcionaria2', password: 'func123', role: 'funcionaria', lastLogin: null },
            { username: 'vendedora', password: 'vend123', role: 'funcionaria', lastLogin: null }
        ];
    }
    
    // Verificar se está logado
    function checkAuth() {
        const isLoggedIn = sessionStorage.getItem('loggedIn');
        const username = sessionStorage.getItem('username');
        
        if (!isLoggedIn || isLoggedIn !== 'true') {
            // Não está logado, redirecionar para login
            window.location.href = 'index.html';
            return false;
        }
        
        // Verificar se usuário ainda existe
        const users = loadUsers();
        const user = users.find(u => u.username === username);
        
        if (!user) {
            // Usuário não existe mais, fazer logout
            logout();
            return false;
        }
        
        return true;
    }
    
    // Função de logout
    function logout() {
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('userRole');
        window.location.href = 'index.html';
    }
    
    // Adicionar botão de logout se for admin
    function addLogoutButton() {
        const username = sessionStorage.getItem('username');
        const userRole = sessionStorage.getItem('userRole');
        
        if (userRole === 'admin') {
            // Adicionar botão de logout no header
            const header = document.querySelector('.header');
            if (header) {
                const logoutBtn = document.createElement('a');
                logoutBtn.href = '#';
                logoutBtn.onclick = function(e) {
                    e.preventDefault();
                    logout();
                };
                logoutBtn.style.cssText = `
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    color: white;
                    text-decoration: none;
                    background: rgba(255,255,255,0.2);
                    padding: 8px 15px;
                    border-radius: 20px;
                    font-size: 0.9em;
                    transition: background 0.3s;
                `;
                logoutBtn.textContent = '🚪 Sair';
                logoutBtn.onmouseover = function() {
                    this.style.background = 'rgba(255,255,255,0.3)';
                };
                logoutBtn.onmouseout = function() {
                    this.style.background = 'rgba(255,255,255,0.2)';
                };
                header.style.position = 'relative';
                header.appendChild(logoutBtn);
            }
        }
    }
    
    // Verificar autenticação quando a página carregar
    if (checkAuth()) {
        // Adicionar botão de logout se necessário
        document.addEventListener('DOMContentLoaded', addLogoutButton);
    }
    
    // Expor função de logout globalmente
    window.logout = logout;
})();
