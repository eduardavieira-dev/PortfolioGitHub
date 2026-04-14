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

## 6. Instalando e configurando o Axios

Axios é uma biblioteca para fazer requisições HTTP (GET, POST, PUT, DELETE) de forma simples e limpa.

### Instalação:

```bash
npm install axios
```

### O que é Axios?

- **Biblioteca HTTP**: Facilita requisições para APIs
- **Mais simples que fetch()**: Sintaxe mais clara e menos verbosa
- **Suporte a JSON automático**: Converte dados JSON automaticamente
- **Melhor tratamento de erros**: Captura erros com mais detalhes
- **Cancelamento de requisições**: Pode cancelar requisições em andamento
- **Interceptadores**: Permite interceptar requisições e respostas

### Como usar:

**1. Criar um arquivo de serviço (src/services/api.ts):**

```typescript
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.github.com', // URL base
  timeout: 10000, // Timeout em ms
})
```

**2. Usar em um componente (exemplo: GET):**

```typescript
import { api } from './services/api'

async function buscarUsuario(username: string) {
  try {
    const response = await api.get(`/users/${username}`)
    console.log('Dados do usuário:', response.data)
  } catch (error) {
    console.error('Erro:', error.message)
  }
}
```

**3. Outros tipos de requisições:**

```typescript
// POST - Enviar dados
const response = await api.post('/endpoint', { nome: 'João' })

// PUT - Atualizar dados
const response = await api.put('/endpoint/1', { nome: 'Maria' })

// DELETE - Remover dados
const response = await api.delete('/endpoint/1')
```

### Vantagens sobre fetch():

| Recurso | Axios | Fetch |
|---------|-------|-------|
| Sintaxe | Simples | Verbosa |
| JSON automático | ✅ Sim | ❌ Precisa `.json()` |
| Timeout | ✅ Configurável | ❌ Não tem |
| Erro automático | ✅ Sim | ❌ Precisa verificar status |
| Cancelar requisição | ✅ Sim | ❌ Complexo |

## 7. Instalando o grafico de contribuicoes do GitHub

Para exibir o calendario de contribuicoes no perfil:

```bash
npm install react-github-calendar
```



## 8. Extensão recomendada para VS Code

- **Tailwind CSS IntelliSense**
  - ID: `bradlc.vscode-tailwindcss`
  - [Marketplace](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

---
Pronto! Agora você tem um projeto React moderno com Tailwind CSS, pronto para evoluir.
