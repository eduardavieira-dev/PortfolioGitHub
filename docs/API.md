# Integração com API no Projeto PortfolioGithub

Este projeto utiliza a API do GitHub para buscar informações de usuários e seus repositórios, usando o Axios para requisições HTTP e React para exibir os dados.

---

## 1. Serviço de API com Axios

O arquivo `src/services/api.ts` centraliza a configuração do Axios:

```typescript
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.github.com', // URL base para todas as requisições
  timeout: 10000, // Tempo máximo de espera (10 segundos)
})
```

---

## 2. Tipos dos dados

No `App.tsx`, definimos as interfaces para tipar os dados vindos da API:

```typescript
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
```

---

## 3. Estados para armazenar dados da API

```typescript
const [repositories, setRepositories] = useState<Repository[]>([])
const [user, setUser] = useState<UserProfile | null>(null)
const [loading, setLoading] = useState(false)
const [hasSearched, setHasSearched] = useState(false)
```
- `repositories`: lista dos repositórios do usuário buscado
- `user`: dados do perfil do usuário
- `loading`: controla o estado de carregamento
- `hasSearched`: indica se já foi feita uma busca

---

## 4. Função de busca: como consultar a API

```typescript
async function handleSearchUser(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
  const username = (formData.get('username') as string).trim()

  if (!username) return

  setHasSearched(true)
  setUser(null)
  setRepositories([])
  setLoading(true)
  try {
    // Busca perfil e repositórios ao mesmo tempo
    const [userResponse, reposResponse] = await Promise.all([
      api.get(`/users/${username}`),
      api.get(`/users/${username}/repos`),
    ])

    const userData = userResponse.data
    const reposData = reposResponse.data

    // Atualiza estado do usuário
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

    // Atualiza estado dos repositórios
    if (Array.isArray(reposData)) {
      const mappedRepos: Repository[] = reposData.slice(0, 12).map((repo) => ({
        name: repo.name,
        description: repo.description || '',
        topics: (repo.topics || []).slice(0, 4),
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        url: repo.html_url,
      }))
      setRepositories(mappedRepos)
    } else {
      setRepositories([])
    }
  } catch (error) {
    setRepositories([])
    setUser(null)
  } finally {
    setLoading(false)
  }
}
```

---

## 5. Exibindo os dados: componentes reutilizáveis

### Exemplo de uso no App:

```tsx
{repositories.length > 0 ? (
  <div id="repositories" className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
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
) : (
  <div className="text-center text-secondary py-8">
    <p>Nenhum repositório encontrado. Busque por um usuário do GitHub acima!</p>
  </div>
)}
```

### O componente CardRepository:

```typescript
import { GitFork, Star, ArrowSquareOut } from '@phosphor-icons/react'

interface CardRepositoryProps {
  name: string
  description: string
  topics: string[]
  stars: number
  forks: number
  url?: string
}

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
      <div className="flex items-center justify-between w-full  mb-3">
        <h3 className="font-medium text-md">{name}</h3>
        <a
          href={url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-pink-400 transition-colors"
        >
          <ArrowSquareOut size={17} />
        </a>
      </div>
      <p className="text-xs mb-3 line-clamp-2">{description}</p>
      <div className="flex gap-1 mb-3">
        {topics.map((topic, index) => (
          <span
            key={index}
            className="text-[10px] leading-none bg-primary text-primary rounded-xl px-2 py-1 justify-center"
          >
            {topic}
          </span>
        ))}
      </div>
      <div className="flex-1"></div>
      <div className="text-secondary text-sm flex items-center gap-4 mt-2">
        <div className="flex items-center gap-1">
          <Star size={12} className="text-secondary" />
          <span className="text-xs">{stars}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork size={12} className="text-secondary" />
          <span className="text-xs">{forks}</span>
        </div>
      </div>
    </div>
  )
}
```

---

## 6. Resumo do fluxo

1. O usuário digita o nome e envia o formulário.
2. O App busca os dados do GitHub usando Axios.
3. Os dados são salvos nos estados (`user`, `repositories`).
4. O App renderiza os componentes reutilizáveis passando os dados como props.

---

**Dica:**
- O App só busca e organiza os dados.
- O CardRepository só exibe UM card, recebendo tudo pronto via props.
- Isso deixa o código limpo, modular e fácil de manter.
