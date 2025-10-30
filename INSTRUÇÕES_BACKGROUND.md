# 🖼️ Como Adicionar sua Imagem de Background

## 📋 Passo a Passo

### 1. **Prepare sua Imagem**
- ✅ **Nome**: Renomeie sua imagem para `background.jpg`
- ✅ **Formato**: JPG, PNG ou WebP
- ✅ **Resolução**: Mínimo 1920x1080 (Full HD)
- ✅ **Tamanho**: Máximo 5MB para carregamento rápido

### 2. **Adicione ao Projeto**
```
📁 pjt marcel/
├── 📄 index.html
├── 📄 styles.css  
├── 📄 script.js
├── 🖼️ background.jpg  ← SUA IMAGEM AQUI
└── 📄 README.md
```

### 3. **Testando**
1. Coloque o arquivo `background.jpg` na pasta do projeto
2. Abra `index.html` no navegador
3. Sua imagem aparecerá automaticamente como fundo

## 🎨 Personalizações Opcionais

### Ajustar Transparência do Overlay
No arquivo `styles.css`, linha 42:
```css
/* Menos escuro = mais transparente */
background: rgba(0, 0, 0, 0.2);  /* 0.2 = 20% escuro */

/* Mais escuro = menos transparente */  
background: rgba(0, 0, 0, 0.5);  /* 0.5 = 50% escuro */
```

### Ajustar Brilho da Imagem
No arquivo `styles.css`, linha 32:
```css
/* Mais brilhante */
filter: brightness(1.1) contrast(1.1);

/* Mais escuro */
filter: brightness(0.8) contrast(1.2);
```

### Mudar Cor do Overlay
Para overlay colorido em vez de preto:
```css
/* Overlay azul */
background: rgba(75, 100, 234, 0.3);

/* Overlay roxo */
background: rgba(118, 75, 162, 0.3);

/* Overlay vermelho */
background: rgba(234, 75, 75, 0.3);
```

## 🔧 Formatos Suportados

| Formato | Recomendação | Motivo |
|---------|-------------|--------|
| JPG | ⭐⭐⭐⭐⭐ | Menor tamanho, boa qualidade |
| PNG | ⭐⭐⭐⭐ | Alta qualidade, maior tamanho |
| WebP | ⭐⭐⭐⭐⭐ | Melhor compressão (moderno) |

## ❓ Problemas Comuns

### Imagem não aparece
- ✅ Verifique se o nome é exatamente `background.jpg`
- ✅ Confirme que está na pasta correta
- ✅ Teste com outro formato (PNG)

### Imagem cortada/esticada
- ✅ Use imagens em proporção 16:9 (1920x1080)
- ✅ Evite imagens muito quadradas

### Carregamento lento
- ✅ Comprima a imagem (use ferramentas online)
- ✅ Mantenha abaixo de 2MB

---

**💡 Dica**: Imagens de paisagens, gradientes ou texturas funcionam melhor como background!
