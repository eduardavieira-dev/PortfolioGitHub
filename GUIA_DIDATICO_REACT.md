# 📚 Guia Didático: React do Zero ao Projeto Portfolio GitHub

**Objetivo:** Explicar gradualmente os conceitos fundamentais de React usando exemplos do projeto Portfolio GitHub.

> Este guia é progressivo e incremental. Recomendamos ler na ordem apresentada.

---

## 📑 Índice

1. [Props: Componentes Reutilizáveis](#1-props-componentes-reutilizáveis)
2. [Responsividade e Estilização](#2-responsividade-e-estilização)
3. [Hooks: useState](#3-hooks-usestate)
4. [Axios vs Fetch](#4-axios-vs-fetch)
5. [Fluxo Completo do Projeto](#5-fluxo-completo-do-projeto)

---

# 1. Props: Componentes Reutilizáveis

## 1.1 Problema: Duplicação de Código

Imagine que você precisa mostrar várias "pills" (pequenos retângulos com texto) no seu portfolio:

### ❌ Sem Props (Ruins - Muita Repetição)

```tsx
// SEM PROPS - MUITO REPETITIVO!
export function InterestSection() {
  return (
    <div className="flex flex-wrap gap-1">
      {/* Pill 1 */}
      <div className="bg-primary text-primary rounded-full px-3 py-1 text-xs font-medium">
        <span>Front-end</span>
      </div>
      
      {/* Pill 2 */}
      <div className="bg-primary text-primary rounded-full px-3 py-1 text-xs font-medium">
        <span>UI/UX Design</span>
      </div>
      
      {/* Pill 3 */}
      <div className="bg-primary text-primary rounded-full px-3 py-1 text-xs font-medium">
        <span>APIs</span>
      </div>
      
      {/* Pill 4 - E temos que copiar tudo de novo?! */}
      <div className="bg-primary text-primary rounded-full px-3 py-1 text-xs font-medium">
        <span>Banco de Dados</span>
      </div>
    </div>
  )
}
```

**Problemas:**
- 📋 Muito código repetido
- 🔧 Se mudarmos o estilo, temos que mudar em 4 lugares
- 😫 Difícil de manter

---

## 1.2 Solução: Usar Props

### ✅ Com Props (Bom - Reutilizável)

**Passo 1: Criar um componente simples que aceita props**

```tsx
// ✨ InteressPill.tsx - Componente Reutilizável
interface InteressPillProps {
  text: string  // A prop "text" é o texto que será exibido
}

export function InteressPill({ text }: InteressPillProps) {
  // A gente desestrutura a prop "text" do objeto de props
  return (
    <div className="bg-primary text-primary rounded-full px-3 py-1 text-xs font-medium">
      <span>{text}</span>
    </div>
  )
}
```

**O que é uma "Props"?**
- Props = "Propriedades" (abreviação de Properties)
- São argumentos que passamos para um componente
- Funcionam como parâmetros de uma função
- Permitem que um componente seja reutilizável

**Passo 2: Usar o componente com diferentes valores**

```tsx
// App.tsx
export default function App() {
  return (
    <div>
      <h3>Interesses</h3>
      <div className="flex flex-wrap gap-1">
        {/* Passando diferentes valores para a mesma prop "text" */}
        <InteressPill text="Front-end" />
        <InteressPill text="UI/UX Design" />
        <InteressPill text="APIs" />
        <InteressPill text="Banco de Dados" />
      </div>
    </div>
  )
}
```

**Vantagens:**
- ✅ Código limpo e DRY (Don't Repeat Yourself)
- ✅ Fácil de manter - mudança em um lugar só
- ✅ Reutilizável em qualquer lugar do projeto

---

## 1.3 Props Mais Complexas: CardRepository

No projeto, temos um componente chamado `CardRepository` que mostra um repositório do GitHub. Ele precisa de MUITOS dados:

### Interface: Tipando as Props

```tsx
// CardRepository.tsx
interface CardRepositoryProps {
  name: string           // Nome do repositório
  description: string    // Descrição
  topics: string[]       // Array de tags (tópicos)
  stars: number          // Quantidade de estrelas
  forks: number          // Quantidade de forks
  url?: string           // URL (opcional, o ? significa que é opcional)
}

export function CardRepository({
  name,
  description,
  topics,
  stars,
  forks,
  url,
}: CardRepositoryProps) {
  // Aqui todos os dados estão desestruturados e prontos para usar
  return (
    <div className="border border-card rounded-lg p-4 flex flex-col h-full">
      <div className="flex items-center justify-between w-full mb-3">
        <h3 className="font-medium text-md">{name}</h3>
        <a href={url || '#'} target="_blank" rel="noopener noreferrer">
          {/* Ícone de link externo */}
        </a>
      </div>
      
      <p className="text-xs mb-3">{description}</p>
      
      <div className="flex gap-1 mb-3">
        {/* Renderizar cada topic em uma pill */}
        {topics.map((topic, index) => (
          <span key={index} className="text-[10px] bg-primary rounded-xl px-2 py-1">
            {topic}
          </span>
        ))}
      </div>
      
      <div className="flex items-center gap-4">
        <div>{/* Ícone de estrela */} {stars}</div>
        <div>{/* Ícone de fork */} {forks}</div>
      </div>
    </div>
  )
}
```

### Como usar o CardRepository:

```tsx
// App.tsx
<CardRepository
  name="meu-projeto"
  description="Um incrível projeto React"
  topics={["react", "typescript", "tailwind"]}
  stars={42}
  forks={10}
  url="https://github.com/user/meu-projeto"
/>
```

**Explicação das Props:**

| Prop | Tipo | Exemplo | Uso |
|------|------|---------|-----|
| `name` | `string` | "meu-projeto" | Título do card |
| `description` | `string` | "Um projeto..." | Descrição na primeira linha |
| `topics` | `string[]` | ["react", "ts"] | Array renderizado com `.map()` |
| `stars` | `number` | 42 | Número exibido com ícone de estrela |
| `forks` | `number` | 10 | Número exibido com ícone de fork |
| `url` | `string` (opcional) | "https://..." | Link ao clicar no repositório |

---

## 1.4 Desestruturação de Props

### O que é desestruturação?

Desestruturação é pegar valores de um objeto e "separar" em variáveis individuais:

**Sem desestruturação:**
```tsx
export function InteressPill(props: InteressPillProps) {
  return <div>{props.text}</div>  // Temos que usar props.text
}
```

**Com desestruturação:**
```tsx
export function InteressPill({ text }: InteressPillProps) {
  return <div>{text}</div>  // Podemos usar apenas text
}
```

A desestruturação torna o código:
- ✅ Mais legível
- ✅ Mais curto
- ✅ Mais fácil de entender quais props são usadas

---

## 1.5 Array de Dados com Props

Um padrão comum é passar um array para um componente e ele renderizar múltiplos cards:

```tsx
// App.tsx
interface Repository {
  name: string
  description: string
  topics: string[]
  stars: number
  forks: number
  url: string
}

export default function App() {
  const repositories: Repository[] = [
    {
      name: "projeto-1",
      description: "Meu primeiro projeto",
      topics: ["react"],
      stars: 5,
      forks: 2,
      url: "https://github.com/..."
    },
    {
      name: "projeto-2",
      description: "Meu segundo projeto",
      topics: ["typescript", "tailwind"],
      stars: 15,
      forks: 5,
      url: "https://github.com/..."
    }
  ]

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {/* .map() itera o array e cria um CardRepository para cada item */}
      {repositories.map((repo) => (
        <CardRepository
          key={repo.name}
          name={repo.name}
          description={repo.description}
          topics={repo.topics}
          stars={repo.stars}
          forks={repo.forks}
          url={repo.url}
        />
      ))}
    </div>
  )
}
```

**Explicação do `.map()`:**
- `.map()` itera (passa por) cada item de um array
- Para cada item, executa a função
- No caso acima, cria um `<CardRepository />` para cada repositório

---

# 2. Responsividade e Estilização

## 2.1 O que é Responsividade?

Responsividade = sua website funciona bem em **qualquer tamanho de tela**:
- 📱 Celular (pequeno)
- 📱 Tablet (médio)
- 💻 Desktop (grande)

---

## 2.2 Tailwind CSS: Classes para Estilo Rápido

Nosso projeto usa **Tailwind CSS**, que é um framework de CSS que utiliza **classes pré-definidas**:

### Exemplo Simples: Cores e Padding

```tsx
// Sem Tailwind (CSS tradicional)
export function InteressPill() {
  return (
    <div style={{
      backgroundColor: 'rgb(236, 72, 153)',
      color: 'rgb(236, 72, 153)',
      borderRadius: '9999px',
      paddingLeft: '12px',
      paddingRight: '12px',
      paddingTop: '4px',
      paddingBottom: '4px',
      fontSize: '12px',
      fontWeight: 'bold'
    }}>
      Front-end
    </div>
  )
}
```

```tsx
// Com Tailwind (MUITO mais simples!)
export function InteressPill() {
  return (
    <div className="bg-primary text-primary rounded-full px-3 py-1 text-xs font-medium">
      Front-end
    </div>
  )
}
```

**Explicação das classes Tailwind:**

| Classe | O que faz | Valor |
|--------|-----------|-------|
| `bg-primary` | Background (cor de fundo) | Cor primária do tema |
| `text-primary` | Cor do texto | Cor primária |
| `rounded-full` | Arredondar os cantos | 100% (círculo) |
| `px-3` | Padding horizontal (esquerda + direita) | 12px |
| `py-1` | Padding vertical (cima + baixo) | 4px |
| `text-xs` | Tamanho do texto | Extra pequeno (12px) |
| `font-medium` | Peso da fonte | Médio (500) |

---

## 2.3 Responsividade com Tailwind

### Prefixos de Breakpoint

Tailwind usa prefixos para aplicar estilos em tamanhos específicos de tela:

```tsx
// Exemplo do App.tsx
<div className="flex flex-col gap-3 mt-10 lg:flex-row">
  {/* Em telas pequenas (padrão): flex-col (coluna vertical) */}
  {/* Em telas grandes (lg:): lg:flex-row (linha horizontal) */}
</div>
```

**Prefixos de Responsividade:**

| Prefixo | Tamanho | Quando usa |
|---------|--------|-----------|
| (nenhum) | Tudo | Todos os tamanhos |
| `sm:` | ≥ 640px | Tablets pequenos |
| `md:` | ≥ 768px | Tablets |
| `lg:` | ≥ 1024px | Desktop pequeno |
| `xl:` | ≥ 1280px | Desktop médio |
| `2xl:` | ≥ 1536px | Desktop grande |

### Exemplo: Grid Responsivo

```tsx
// CardRepository em grade responsiva
<div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
  {repositories.map((repo) => (
    <CardRepository {...repo} />
  ))}
</div>
```

**O que acontece em cada tamanho:**
- 📱 **Celular**: 1 coluna (padrão grid-cols-1)
- 📱 **Tablets** (sm): `sm:grid-cols-2` = 2 colunas
- 💻 **Desktop** (md): `md:grid-cols-3` = 3 colunas

---

## 2.4 Flexbox para Layout

`flex` e `flex-col` organizam elementos em linha ou coluna:

```tsx
// Linha horizontal (padrão)
<div className="flex gap-4">
  <button>Botão 1</button>
  <button>Botão 2</button>
  <button>Botão 3</button>
</div>
```

```tsx
// Coluna vertical
<div className="flex flex-col gap-4">
  <h1>Título</h1>
  <p>Parágrafo 1</p>
  <p>Parágrafo 2</p>
</div>
```

**Classes Flexbox úteis:**

| Classe | Função |
|--------|--------|
| `flex` | Ativa flexbox (padrão: linha) |
| `flex-col` | Muda para coluna |
| `gap-4` | Espaço entre elementos |
| `items-center` | Alinha verticalmente ao centro |
| `justify-between` | Espaça elementos (um vai para cada lado) |
| `flex-1` | Ocupa espaço disponível |

---

## 2.5 Exemplo Completo de Responsividade

```tsx
// CardRepository.tsx - Exemplo real do projeto
export function CardRepository({
  name,
  description,
  topics,
  stars,
  forks,
  url,
}: CardRepositoryProps) {
  return (
    <div className="border border-card rounded-lg p-4 flex flex-col h-full">
      {/* Cabeçalho: título + link */}
      <div className="flex items-center justify-between w-full mb-3">
        <h3 className="font-medium text-md">{name}</h3>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {/* Ícone */}
        </a>
      </div>

      {/* Descrição com limite de 2 linhas */}
      <p className="text-xs mb-3 line-clamp-2">{description}</p>

      {/* Topics (tags) */}
      <div className="flex gap-1 mb-3 flex-wrap">
        {topics.map((topic) => (
          <span
            key={topic}
            className="text-[10px] bg-primary text-primary rounded-xl px-2 py-1"
          >
            {topic}
          </span>
        ))}
      </div>

      {/* Espaçador (cresce para empurrar conteúdo pra baixo) */}
      <div className="flex-1"></div>

      {/* Stats: stars e forks no final */}
      <div className="text-secondary text-sm flex items-center gap-4 mt-2">
        <div className="flex items-center gap-1">
          <Star size={12} />
          <span className="text-xs">{stars}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork size={12} />
          <span className="text-xs">{forks}</span>
        </div>
      </div>
    </div>
  )
}
```

**Por que esse layout é bom:**
- ✅ `flex flex-col` = coluna vertical
- ✅ `flex-1` vazio = espaço flexível (stats vão pro final!)
- ✅ Funciona em qualquer tamanho de tela
- ✅ Proporções mantêm o visual mesmo em telas diferentes

---

# 3. Hooks: useState

## 3.1 O que é um Hook?

Hooks são **funções especiais do React** que permitem:
- ✅ Adicionar estado a componentes funcionais
- ✅ Usar lifecycle do React
- ✅ Reutilizar lógica entre componentes

> **Regra de Ouro:** Hooks devem ser chamados DENTRO de componentes, nunca dentro de loops ou condições.

---

## 3.2 useState: O Hook Mais Comum

`useState` permite que um componente **lembre de coisas** (estado):

### Exemplo Simples: Contador

```tsx
import { useState } from 'react'

export function Counter() {
  // useState retorna um array com [valor_atual, função_para_atualizar]
  const [count, setCount] = useState(0)
  
  // count = 0 (inicial)
  // setCount = função para mudar count

  return (
    <div>
      <p>Você clicou {count} vezes</p>
      {/* Ao clicar, chamamos setCount com um novo valor */}
      <button onClick={() => setCount(count + 1)}>
        Clique aqui
      </button>
    </div>
  )
}
```

**Como funciona:**
1. `useState(0)` cria um estado com valor inicial `0`
2. `count` = valor atual do estado
3. `setCount` = função para atualizar o estado
4. Logo após clicar, `count` muda e o componente re-renderiza

---

## 3.3 useState no Projeto: Buscar Usuário GitHub

No nosso projeto, usamos `useState` para guardar dados da busca:

```tsx
// App.tsx
import { useState } from 'react'

export default function App() {
  // Estado 1: Array de repositórios
  const [repositories, setRepositories] = useState<Repository[]>([])
  
  // Estado 2: Dados do usuário
  const [user, setUser] = useState<UserProfile | null>(null)
  
  // Estado 3: Está carregando?
  const [loading, setLoading] = useState(false)
  
  // Estado 4: Já fez alguma busca?
  const [hasSearched, setHasSearched] = useState(false)

  // Explicação de cada estado:
  // - repositories = dados dos repos (começa vazio [])
  // - user = dados do perfil (começa como null)
  // - loading = está buscando dados? (começa false)
  // - hasSearched = mostrar resultados? (começa false)
}
```

**Por que múltiplos useState?**
- Cada estado controla uma coisa diferente
- Quando um muda, só aquela parte re-renderiza
- Mais organizado e legível

---

## 3.4 Atualizando Estado Baseado em Dados da API

Aqui é onde tudo se conecta: **axios busca dados, useState guarda os dados**

```tsx
async function handleSearchUser(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  
  // Pega o username digitado
  const formData = new FormData(e.currentTarget)
  const username = (formData.get('username') as string).trim()

  if (!username) return

  // 🎯 PASSO 1: Preparar para busca
  setHasSearched(true)      // Mostrar resultados depois
  setUser(null)             // Limpar usuário anterior
  setRepositories([])       // Limpar repos anterior
  setLoading(true)          // Mostrar "Buscando..."

  try {
    // 🎯 PASSO 2: Buscar dados com AXIOS
    const [userResponse, reposResponse] = await Promise.all([
      api.get(`/users/${username}`),           // Buscar usuário
      api.get(`/users/${username}/repos`),     // Buscar repos
    ])

    const userData = userResponse.data
    const reposData = reposResponse.data

    // 🎯 PASSO 3: Guardar dados no estado
    if (userData && userData.login) {
      // Se usuário existe, guardar dados formatados
      setUser({
        name: userData.name || userData.login,
        login: userData.login,
        bio: userData.bio || 'Sem descrição',
        public_repos: userData.public_repos || 0,
        followers: userData.followers || 0,
        following: userData.following || 0,
        avatar_url: userData.avatar_url || '',
      })
    } else {
      setUser(null)  // Usuário não existe
    }

    // 🎯 PASSO 4: Guardar repositórios
    if (Array.isArray(reposData)) {
      const mappedRepos: Repository[] = reposData.slice(0, 12).map((repo) => ({
        name: repo.name,
        description: repo.description || '',
        topics: (repo.topics || []).slice(0, 4),
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        url: repo.html_url,
      }))
      setRepositories(mappedRepos)  // Guardar 12 repos
    }

  } catch (error) {
    // Se falhar, limpar dados
    console.error('Erro:', error)
    setRepositories([])
    setUser(null)
  } finally {
    // Sempre executado (sucesso ou erro)
    setLoading(false)  // Parar de mostrar "Buscando..."
  }
}
```

**Fluxo resumido:**
1. Usuário digita username e clica "Buscar"
2. `setLoading(true)` → mostra "Buscando..."
3. `api.get()` busca dados do GitHub
4. `setUser()` e `setRepositories()` guardam dados
5. Componente re-renderiza com novos dados
6. `setLoading(false)` → para de carregar

---

## 3.5 Renderização Condicional com Estado

Usamos o estado para **decidir o que mostrar**:

```tsx
{hasSearched && (
  <section id="profile-user">
    {loading ? (
      // Se está carregando
      <div>Buscando usuário...</div>
    ) : !user ? (
      // Se não encontrou usuário
      <div>Não foi encontrado nenhum usuário</div>
    ) : (
      // Se encontrou usuário, mostrar tudo
      <>
        <ProfileInformations user={user} />
        <div className="grid md:grid-cols-3 gap-4">
          {repositories.map((repo) => (
            <CardRepository key={repo.name} {...repo} />
          ))}
        </div>
      </>
    )}
  </section>
)}
```

**Lógica:**
- Se `hasSearched` é false → não mostra nada
- Se `loading` é true → mostra "Buscando..."
- Se `user` é null → mostra "Não encontrado"
- Se `user` existe → mostra dados

---

# 4. Axios vs Fetch

## 4.1 O Problema do Fetch

```tsx
// ❌ Fetch - Muita cerimônia
async function buscaComFetch(username: string) {
  try {
    // Passo 1: Fazer requisição
    const response = await fetch(`https://api.github.com/users/${username}`)
    
    // Passo 2: Verificar se foi ok
    if (!response.ok) {
      throw new Error(`Erro ${response.status}`)
    }
    
    // Passo 3: Converter para JSON (espera aí, por quê?)
    const data = await response.json()
    
    // Passo 4: Agora as coisas funcionam
    console.log(data)
  } catch (error) {
    console.error('Erro:', error)
  }
}
```

**Problemas do Fetch:**
- ❌ Não converte JSON automaticamente
- ❌ Não trata erro HTTP automaticamente (precisa verificar `.ok`)
- ❌ Sem timeout padrão
- ❌ Mais verboso

---

## 4.2 A Solução: Axios

```tsx
// ✅ Axios - Simples e Direto
import { api } from './services/api'

async function buscaComAxios(username: string) {
  try {
    // Tudo em uma linha clara
    const response = await api.get(`/users/${username}`)
    
    // JSON já vem convertido em response.data
    console.log(response.data)
  } catch (error) {
    // Erro é tratado automaticamente
    console.error('Erro:', error)
  }
}
```

**Vantagens do Axios:**
- ✅ JSON convertido automaticamente
- ✅ Erros tratados automaticamente
- ✅ Timeout configurável
- ✅ Menos código, mais legível

---

## 4.3 Comparação: Fetch vs Axios

### Requisição GET

**Com Fetch:**
```tsx
const response = await fetch('https://api.github.com/users/eduardavieira-dev')
const data = await response.json()  // Precisa converter
if (!response.ok) throw new Error()  // Precisa verificar
```

**Com Axios:**
```tsx
const { data } = await api.get('/users/eduardavieira-dev')  // Tudo automático
```

### Requisição POST

**Com Fetch:**
```tsx
const response = await fetch('https://api.example.com/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Novo post' })
})
const data = await response.json()
```

**Com Axios:**
```tsx
const { data } = await api.post('/posts', { title: 'Novo post' })
```

### Múltiplas Requisições

**Com Fetch:**
```tsx
const res1 = await fetch('url1')
const res2 = await fetch('url2')
const data1 = await res1.json()
const data2 = await res2.json()
```

**Com Axios (Project.all):**
```tsx
const [res1, res2] = await Promise.all([
  api.get('/endpoint1'),
  api.get('/endpoint2'),
])
```

---

## 4.4 Como Axios está Configurado no Projeto

Arquivo: `src/services/api.ts`

```tsx
import axios from 'axios'

// Criar uma instância com configuração padrão
export const api = axios.create({
  baseURL: 'https://api.github.com',  // URL base (não precisa repetir)
  timeout: 10000,                     // 10 segundos timeout
})
```

**Benefício da instância:**
- Toda requisição usa automaticamente `https://api.github.com`
- Não precisa repetir a URL em cada `api.get()`

```tsx
// Sem precisar escrever a URL completa:
api.get('/users/eduardavieira-dev')
// = GET https://api.github.com/users/eduardavieira-dev
```

---

## 4.5 Tratamento de Erros com Axios

```tsx
try {
  const { data } = await api.get(`/users/${username}`)
  console.log('Sucesso:', data)
} catch (error) {
  // Axios coloca informações no error.response
  if (error.response?.status === 404) {
    console.log('Usuário não encontrado')
  } else if (error.response?.status === 429) {
    console.log('Limite de requisições atingido')
  } else {
    console.error('Erro desconhecido:', error.message)
  }
}
```

**Vantagens:**
- `error.response.status` = código HTTP (404, 500, etc)
- `error.response.data` = dados da resposta de erro
- `error.message` = mensagem de erro

---

# 5. Fluxo Completo do Projeto

## 5.1 Diagrama do Fluxo

```
┌─────────────────┐
│   Usuário       │
│ Digita Username │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│  handleSearchUser()             │
│  .preventDefault() - não recarrega│
│  .trim() - remove espaços       │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  setLoading(true)               │
│  Mostra "Buscando..."           │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Promise.all() + Axios          │
│  - api.get(/users/...)          │
│  - api.get(/users/.../repos)    │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Dados chegam (response.data)    │
│  Formatar dados                 │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  setUser(userData)              │
│  setRepositories(mappedRepos)   │
│  Estado atualizado              │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  React re-renderiza             │
│  Componente se atualiza         │
│  com novos dados                │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  setLoading(false)              │
│  Para de mostrar "Buscando..."  │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  ProfileInformations renderiza  │
│  Cards de repositórios mostram  │
└─────────────────────────────────┘
```

---

## 5.2 Código Completo Comentado

```tsx
// ============ IMPORTS ============
import { useState } from 'react'
import { CardRepository } from './components/CardRepository'
import { api } from './services/api'

// ============ INTERFACES (Tipos) ============
interface Repository {
  name: string
  description: string
  topics: string[]
  stars: number
  forks: number
  url: string
}

interface UserProfile {
  name: string
  login: string
  bio: string
  public_repos: number
  followers: number
  following: number
  avatar_url: string
}

// ============ COMPONENTE PRINCIPAL ============
export default function App() {
  // ============ ESTADOS ============
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  // ============ FUNÇÃO DE BUSCA ============
  async function handleSearchUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()  // Não recarrega a página
    
    const formData = new FormData(e.currentTarget)
    const username = (formData.get('username') as string).trim()

    if (!username) return  // Se vazio, não faz nada

    // ---- Preparar para busca ----
    setHasSearched(true)        // Mostrar resultados depois
    setUser(null)               // Limpar dados antigos
    setRepositories([])         // Limpar repos antigos
    setLoading(true)            // Mostrar "Buscando..."

    try {
      // ---- BUSCAR DADOS COM AXIOS ----
      const [userResponse, reposResponse] = await Promise.all([
        api.get(`/users/${username}`),           // Perfil do usuário
        api.get(`/users/${username}/repos`),     // Repositórios do usuário
      ])

      const userData = userResponse.data
      const reposData = reposResponse.data

      // ---- PROCESSAR DADOS DO USUÁRIO ----
      if (userData && userData.login) {
        setUser({
          name: userData.name || userData.login,
          login: userData.login,
          bio: userData.bio || 'Sem descrição',
          public_repos: userData.public_repos || 0,
          followers: userData.followers || 0,
          following: userData.following || 0,
          avatar_url: userData.avatar_url || '',
        })
      } else {
        setUser(null)
      }

      // ---- PROCESSAR DADOS DOS REPOSITÓRIOS ----
      if (Array.isArray(reposData)) {
        const mappedRepos: Repository[] = reposData
          .slice(0, 12)  // Pegar apenas 12 primeiros repos
          .map((repo) => ({
            name: repo.name,
            description: repo.description || '',
            topics: (repo.topics || []).slice(0, 4),      // 4 primeiros tópicos
            stars: repo.stargazers_count || 0,
            forks: repo.forks_count || 0,
            url: repo.html_url,
          }))
        setRepositories(mappedRepos)
      } else {
        setRepositories([])
      }

    } catch (error) {
      // ---- TRATAMENTO DE ERRO ----
      console.error('Erro ao buscar dados:', error)
      setRepositories([])
      setUser(null)
    } finally {
      // ---- FINALIZAR (acontece sempre) ----
      setLoading(false)  // Para de mostrar "Buscando..."
    }
  }

  // ============ RENDERIZAÇÃO ============
  return (
    <div>
      {/* ---- FORM DE BUSCA ---- */}
      <form onSubmit={handleSearchUser}>
        <input type="text" name="username" placeholder="Digite um username" />
        <button type="submit" disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {/* ---- MOSTRAR RESULTADOS ---- */}
      {hasSearched && (
        <>
          {loading ? (
            <p>Buscando usuário...</p>
          ) : !user ? (
            <p>Não foi encontrado nenhum usuário</p>
          ) : (
            <>
              {/* Dados do usuário */}
              <div>
                <img src={user.avatar_url} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.bio}</p>
                <p>Repos: {user.public_repos}</p>
                <p>Seguidores: {user.followers}</p>
              </div>

              {/* Cards de repositórios */}
              <div className="grid md:grid-cols-3 gap-4">
                {repositories.map((repo) => (
                  <CardRepository key={repo.name} {...repo} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
```

---

## 5.3 Resumo: Tudo Junto

| Conceito | O quê | Por quê | Como |
|----------|-------|--------|------|
| **Props** | Dados passados pro componente | Reutilizar componentes | `{ nome, idade }` interface + desestruturação |
| **useState** | Guardar dados que mudam | Lembrar do estado da app | `[valor, setValue] = useState(inicial)` |
| **Axios** | Buscar dados de API | Mais simples que fetch | `api.get('/endpoint')` |
| **Tailwind CSS** | Estilo com classes | Escrever CSS rápido | `className="bg-blue-500 px-4 py-2"` |
| **Responsividade** | Funcionar em qualquer tela | Boa UX | `md:grid-cols-3 sm:grid-cols-2` |

---

# 🎓 Próximos Passos

1. **Entender melhor Tailwind:** Acesse https://tailwindcss.com/docs
2. **Explorar outros Hooks:** useEffect, useContext, useReducer
3. **APIs:** Explore outras APIs públicas (PokeAPI, OpenWeather, etc)
4. **Testes:** Adicionar testes com Jest/Vitest
5. **Performance:** useCallback, useMemo para otimizar re-renders

---

# 📖 Glossário

- **Props:** Propriedades passadas a um componente (como argumentos de função)
- **Estado:** Dados que podem mudar e causam re-render
- **Hook:** Função especial do React (useState, useEffect, etc)
- **Desestruturação:** Pegar valores de objeto/array e colocar em variáveis
- **Re-render:** React atualizar o componente na tela
- **API:** Interface para comunicação entre aplicações (GitHub API, etc)
- **Axios:** Biblioteca para fazer requisições HTTP
- **Tailwind CSS:** Framework para estilo com classes pré-definidas
- **Interface:** Tipo TypeScript que define a forma de um objeto
- **Breakpoint:** Ponto onde a responsividade muda (sm, md, lg, etc)
