# 👥 Sistema de Gerenciamento de Usuários

## 📋 Visão Geral
O sistema permite gerenciar usuários e senhas diretamente pela área administrativa, sem necessidade de editar código.

## 🔐 Acesso ao Sistema
- **URL:** `admin.html`
- **Login:** `admin` / `admin123`
- **Botão:** "👥 Gerenciar Usuários"

## 🛠️ Funcionalidades

### 1. **Adicionar Novo Usuário**
- **Nome de Usuário:** Único, sem espaços
- **Senha:** Mínimo 6 caracteres
- **Tipo de Acesso:**
  - **Funcionária:** Acesso às páginas de consulta
  - **Administrador:** Acesso completo + área admin

### 2. **Lista de Usuários**
- **Usuário:** Nome de login
- **Tipo:** Administrador ou Funcionária
- **Último Acesso:** Data/hora do último login
- **Ações:** Alterar senha ou excluir

### 3. **Alterar Senha**
- Selecionar usuário
- Inserir nova senha
- Confirmação automática

### 4. **Excluir Usuário**
- Não é possível excluir o `admin`
- Confirmação obrigatória
- Remove acesso imediatamente

## 📊 Usuários Padrão

| Usuário | Senha | Tipo | Acesso |
|---------|-------|------|--------|
| `admin` | `admin123` | Administrador | Completo |
| `funcionaria1` | `func123` | Funcionária | Páginas |
| `funcionaria2` | `func123` | Funcionária | Páginas |
| `vendedora` | `vend123` | Funcionária | Páginas |

## 🔒 Segurança

### **Funcionárias:**
- ✅ Visualizar preços de celulares
- ✅ Visualizar preços de games
- ✅ Visualizar preços de JBL
- ✅ Buscar produtos
- ✅ Ver estoque disponível
- ❌ Não acessam área administrativa

### **Administradores:**
- ✅ Todas as funcionalidades das funcionárias
- ✅ Acesso à área administrativa
- ✅ Gerenciar produtos
- ✅ Gerenciar usuários
- ✅ Importar via TXT
- ✅ Botão de logout

## 📱 Como Usar

### **Para Adicionar Funcionária:**
1. Acesse `admin.html`
2. Faça login como `admin`
3. Clique em "👥 Gerenciar Usuários"
4. Preencha o formulário:
   - **Usuário:** `funcionaria3`
   - **Senha:** `minhasenha123`
   - **Tipo:** `Funcionária`
5. Clique em "Adicionar Usuário"

### **Para Alterar Senha:**
1. Na seção "Alterar Senha de Usuário"
2. Selecione o usuário
3. Digite a nova senha
4. Clique em "Alterar Senha"

### **Para Excluir Usuário:**
1. Na tabela de usuários
2. Clique em "Excluir" na linha do usuário
3. Confirme a exclusão

## 🔄 Sincronização

### **Armazenamento:**
- Dados salvos no `localStorage`
- Sincronização automática entre páginas
- Backup automático na VPS

### **Sessões:**
- Login válido até fechar o navegador
- Logout automático se usuário for excluído
- Verificação de existência em tempo real

## 🚨 Importante

### **Usuário Admin:**
- **NÃO pode ser excluído**
- **NÃO pode ter senha alterada** (por segurança)
- **Sempre tem acesso completo**

### **Senhas:**
- Mínimo 6 caracteres
- Sem validação de complexidade
- Armazenadas em texto simples (localStorage)

### **Backup:**
- Dados salvos automaticamente
- Recomendado fazer backup regular
- Exportar dados via área administrativa

## 📞 Suporte

### **Problemas Comuns:**
1. **"Usuário não encontrado":** Verificar se usuário existe
2. **"Senha incorreta":** Verificar digitação
3. **"Acesso negado":** Verificar tipo de usuário

### **Reset de Emergência:**
Se perder acesso ao admin, edite o arquivo `index.html` e `auth.js` para restaurar usuários padrão.

## 🔧 Manutenção

### **Limpeza de Sessões:**
```javascript
// Limpar todas as sessões
sessionStorage.clear();
```

### **Reset de Usuários:**
```javascript
// Restaurar usuários padrão
localStorage.removeItem('users');
```

### **Backup de Usuários:**
```javascript
// Exportar usuários
console.log(JSON.parse(localStorage.getItem('users')));
```
