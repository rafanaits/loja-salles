# 📸 Galeria de Imagens dos Produtos

## 📁 Estrutura de Pastas

Cada categoria tem sua própria pasta para organizar as imagens:

```
imagens_produtos/
├── Redmi/
├── Note/
├── Poco/
├── Realme/
├── Honor/
├── Infinix/
├── iPhone/
├── Samsung/
├── Apple Watch/
├── iPad/
├── MacBook/
├── PlayStation/
├── Xbox/
├── Nintendo/
├── JBL/
├── Robot Xiaomi/
└── Starlink/
```

## 📋 Convenção de Nomenclatura

Para cada modelo de produto, use o seguinte padrão:

### 📱 Celulares:
- `[MODELO]_frente.jpg` - Foto da frente do aparelho
- `[MODELO]_verso.jpg` - Foto do verso do aparelho

**Exemplos:**
```
Redmi/
├── A5_128GB_frente.jpg
├── A5_128GB_verso.jpg
├── A4_5G_frente.jpg
├── A4_5G_verso.jpg
└── 13_frente.jpg

Note/
├── 14_128GB_frente.jpg
├── 14_128GB_verso.jpg
├── 14_5G_frente.jpg
└── 14_5G_verso.jpg
```

### 🎮 Outros Produtos:
- `[PRODUTO]_frente.jpg`
- `[PRODUTO]_verso.jpg`

## 🖼️ Especificações das Imagens

- **Formato**: JPG ou PNG
- **Tamanho recomendado**: 400x600 pixels
- **Qualidade**: Boa resolução para mostrar detalhes
- **Fundo**: Preferencialmente neutro (branco ou transparente)

## 💡 Dicas

1. **Organize por modelo**: Coloque as imagens na pasta da categoria correspondente
2. **Use nomes descritivos**: Inclua o modelo e especificações no nome do arquivo
3. **Mantenha consistência**: Use sempre `_frente` e `_verso` no final
4. **Teste a qualidade**: Verifique se as imagens ficam boas na galeria do sistema

## 🔄 Como Funciona

O sistema automaticamente:
1. Busca as imagens na pasta da categoria do produto
2. Exibe uma galeria com frente e verso
3. Permite alternar entre as imagens
4. Mostra as imagens quando o cliente clicar no produto
