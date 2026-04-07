# Como iniciar um projeto React + Tailwind CSS do zero

Este guia ensina a criar um projeto React com Vite, TypeScript e Tailwind CSS do zero, incluindo dicas para Windows.

## 1. Criando o projeto React com Vite

```bash
npm create vite@latest meu-projeto -- --template react-ts
cd meu-projeto
npm install
```

## 2. Instalando o Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

> **Dica para Windows:**
> Se o comando `npx tailwindcss init -p` não criar o arquivo `tailwind.config.js` ou `postcss.config.js`, crie-os manualmente:
>
> - Crie um arquivo chamado `tailwind.config.js` com o conteúdo:
>   ```js
>   module.exports = {
>     content: [
>       "./index.html",
>       "./src/**/*.{js,ts,jsx,tsx}"
>     ],
>     theme: {
>       extend: {},
>     },
>     plugins: [],
>   }
>   ```
> - Crie um arquivo chamado `postcss.config.js` com o conteúdo:
>   ```js
>   module.exports = {
>     plugins: {
>       tailwindcss: {},
>       autoprefixer: {},
>     },
>   }
>   ```

## 3. Configurando o Tailwind no CSS

No arquivo `src/index.css` (ou `App.css`), adicione:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

E importe esse CSS no seu `main.tsx` ou `App.tsx`:

```ts
import './index.css';
```

## 4. Rodando o projeto

```bash
npm run dev
```

## 5. Extensão recomendada para VS Code

- **Tailwind CSS IntelliSense**
  - ID: `bradlc.vscode-tailwindcss`
  - [Marketplace](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

---
Pronto! Agora você tem um projeto React moderno com Tailwind CSS, pronto para evoluir.
