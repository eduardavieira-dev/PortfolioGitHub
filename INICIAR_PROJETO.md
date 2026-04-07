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

## 5. Instalando os icones (Phosphor)

Se o projeto usar icones com Phosphor, instale esta dependencia:

```bash
npm install @phosphor-icons/react
```

Exemplo de uso:

```tsx
import { GithubLogo } from '@phosphor-icons/react'

<GithubLogo size={20} />
```

## 6. Erro comum no Vite: 504 Outdated Optimize Dep

Se aparecer algo como `Failed to load resource: 504 (Outdated Optimize Dep)`, siga estes passos:

1. Pare o servidor (`Ctrl + C`).
2. Limpe o cache de otimização do Vite.
3. Rode o projeto novamente com `--force`.

macOS/Linux:

```bash
rm -rf node_modules/.vite
npm run dev -- --force
```

Windows (Prompt de Comando):

```bat
rmdir /s /q node_modules\.vite
npm run dev -- --force
```

Windows (PowerShell):

```powershell
Remove-Item -Recurse -Force node_modules/.vite
npm run dev -- --force
```

## 7. Extensão recomendada para VS Code

- **Tailwind CSS IntelliSense**
  - ID: `bradlc.vscode-tailwindcss`
  - [Marketplace](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

---
Pronto! Agora você tem um projeto React moderno com Tailwind CSS, pronto para evoluir.
