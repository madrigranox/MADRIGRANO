# Guia de Deploy — GitHub Pages

Este guia descreve como publicar o portal **MADRIGRANO** no GitHub Pages.

## Estrutura de Repositório

Como o projeto possui uma landing page estática (`portfolio/`) e um subprojeto React (`demos/react-app/`), o deploy exige atenção aos caminhos.

### 1. Preparação do React (Demos)

Antes de subir, é necessário gerar o build final das demos:

1.  Navegue até `portfolio/demos/react-app`.
2.  Instale as dependências: `npm install`.
3.  Execute o build: `npm run build`.
4.  Certifique-se de que a pasta `portfolio/demos/react-app/dist` foi criada e contém o `index.html`.

> [!IMPORTANT]
> O `vite.config.js` já está configurado com `base: './'`, o que permite que os arquivos funcionem em subdiretórios no GitHub Pages.

---

### 2. Opções de Deploy

#### Opção A: Deploy Manual (Recomendado)

1.  Crie um novo repositório no GitHub.
2.  Suba apenas o conteúdo da pasta `portfolio` para o branch `main`.
3.  **Importante**: Certifique-se de incluir a pasta `demos/react-app/dist` no seu commit. 
    *Dica: Remova a pasta `/dist/` do seu `.gitignore` local se necessário antes do commit final.*
4.  Vá em **Settings > Pages** no repositório e selecione o branch `main`.

#### Opção B: GitHub Actions (Automatizado)

Se você deseja que o GitHub faça o build do React para você, crie um arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v4

      - name: Install and Build React 🔧
        run: |
          cd demos/react-app
          npm install
          npm run build

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: . # O root do repositório (supondo que esteja nela)
```

---

### 3. Verificação Final

Após o deploy, certifique-se de que:
- [ ] O site carrega em `https://seu-usuario.github.io/seu-repositorio/`.
- [ ] O logo exibe **MADRIGRANO**.
- [ ] No mobile, os cards de projetos deslizam horizontalmente.
- [ ] Ao abrir um demo, o iframe carrega corretamente o conteúdo React.

---

## Solução de Problemas

**Q: Meus demos aparecem como tela branca no modal.**
R: Verifique se a pasta `dist` foi incluída no deploy. O arquivo `script.js` busca por `./demos/react-app/dist/index.html`. No GitHub Pages, URLs diferenciam maiúsculas de minúsculas.
