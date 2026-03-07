# Madrigrano Portfolio

Site estático de apresentação de soluções tecnológicas e demos interativas.

## Descrição
Este repositório contém uma landing page estática com demonstrações de projetos e um subprojeto React para as demos técnicas. O objetivo é servir como portfólio/kit de demonstrações hospedável no GitHub Pages.

## Link GitHub Pages
Disponível em: `https://<seu-usuario>.github.io/<nome-do-repo>/` (substitua conforme necessário).

## Executando localmente
1. Clone o repositório:
   ```bash
   git clone https://github.com/<seu-usuario>/<nome-do-repo>.git
   cd portfolio
   ```
2. Abra `index.html` no browser ou use um servidor simples (ex: `npx serve`).
3. Para reconstruir o subprojeto React: 
   ```bash
   cd demos/react-app
   npm install
   npm run build
   ```
   O build gerará `demos/react-app/dist`, que deve ser versionado para que os iframes funcionem.

## Tecnologias utilizadas
- HTML5, CSS3, JavaScript (ES6+)
- Vite + React + TailwindCSS (apenas no subprojeto `demos/react-app`)
- Google Fonts via CDN

## Observações
- Caminhos relativos sensíveis a maiúsculas no GitHub Pages.
