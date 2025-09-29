# Sistema de Atualização de Produtos via TXT - Loja Salles

## 📄 Funcionalidade Principal

Este sistema permite **substituir completamente** todos os produtos da loja através de um arquivo TXT simples, ideal para atualizações rápidas de estoque e preços.

## 🔄 Como Funciona

1. **Acesse a Área Administrativa** (`admin.html`)
2. **Faça login** com as credenciais padrão:
   - Usuário: `admin`
   - Senha: `lojasalles2024`
3. **Clique em "🔄 Atualizar Produtos via TXT"**
4. **Selecione ou cole** o conteúdo do arquivo TXT
5. **Confirme a substituição** - todos os produtos atuais serão removidos e substituídos pelos do arquivo

## 📋 Formato do Arquivo TXT

### Formato Recomendado (Seu Formato):
```
08 Redmi A5 128/4 preto 540
19 Redmi A5 128/4 azul 540
14 Redmi A5 128/4 gold 540
06 Redmi A5 128/4 verde 540
04 Redmi A5 64/3 gold 470
18 Redmi A5 64/3 preto 470
```

**Estrutura:** `QUANTIDADE MARCA MODELO STORAGE/RAM COR PREÇO`

### Outros Formatos Suportados:
- **Separado por vírgulas:** `iPhone,13 Pro Max,256GB,Preto,4500,5`
- **Separado por tabs:** `iPhone	13 Pro Max	256GB	Preto	4500	5`
- **Formato descritivo:** `iPhone 13 Pro Max 256GB Preto - R$ 4.500,00 - Estoque: 5`

## ⚠️ Importante

- **Esta operação SUBSTITUI COMPLETAMENTE** todos os produtos
- **Produtos não presentes no TXT serão REMOVIDOS** da lista
- **Apenas os produtos do arquivo TXT** ficarão disponíveis
- **Faça backup** dos dados atuais antes de usar

## 🎯 Vantagens

- ✅ **Atualização rápida** de preços e estoque
- ✅ **Remoção automática** de produtos sem estoque
- ✅ **Interface simples** - apenas um arquivo TXT
- ✅ **Múltiplos formatos** suportados
- ✅ **Pré-visualização** antes da confirmação

## 📱 Como Usar

1. **Prepare seu arquivo TXT** com a lista atualizada de produtos
2. **Acesse a área administrativa**
3. **Clique em "🔄 Atualizar Produtos via TXT"**
4. **Selecione o arquivo** ou cole o conteúdo
5. **Revise a pré-visualização**
6. **Confirme a substituição**

## 🔧 Recursos Adicionais

- **Download de arquivo de exemplo** para entender o formato
- **Cópia e cola** direto do clipboard
- **Pré-visualização** dos dados antes da importação
- **Validação automática** dos dados
- **Status automático** baseado na quantidade em estoque

## 📊 Status dos Produtos

O sistema define automaticamente o status baseado na quantidade:
- **Disponível:** Mais de 10 unidades
- **Poucas unidades:** Entre 1 e 10 unidades  
- **Sem estoque:** 0 unidades

## 🚀 Exemplo Prático

**Arquivo TXT:**
```
08 Redmi A5 128/4 preto 540
19 Redmi A5 128/4 azul 540
03 Note 14 128/6 preto 840
```

**Resultado:**
- ✅ 3 produtos carregados
- ✅ Todos os produtos anteriores removidos
- ✅ Apenas estes 3 produtos ficam disponíveis na loja

---

**Desenvolvido para Loja Salles - Sistema de Gestão de Produtos**
