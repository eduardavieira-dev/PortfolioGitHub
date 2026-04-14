import { useState } from 'react'
import { About } from './components/About'
import { CardRepository } from './components/CardRepository'
import { Contribuitions } from './components/Contribuitions'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { InteressPill } from './components/InteressPill'
import { ProfileInformations } from './components/ProfileInformations'
import { ProfileSection } from './components/ProfileSection'
import { TechPill } from './components/TechPill'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { api } from './services/api'

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

export default function App() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

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
      // Fazendo requisições com axios
      const [userResponse, reposResponse] = await Promise.all([
        api.get(`/users/${username}`),
        api.get(`/users/${username}/repos`),
      ])

      const userData = userResponse.data
      const reposData = reposResponse.data

      // Verificando se o usuário existe
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

      // Verificando se recebeu array de repositórios
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
      console.error('Erro ao buscar dados:', error)
      setRepositories([])
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="w-full min-h-[90vh] flex flex-col pt-15 px-8 max-w-6xl mx-auto md:px-15">
        <Header />

        <div className="py-3 grid gap-6 md:grid-cols-3 pb-10 border-b border-card">
          <div className="md:col-span-1">
            <ProfileSection />
          </div>

          <section className="md:col-span-2">
            <About />

            <h3 className="font-medium text-lg">Interesses</h3>
            <div className="flex flex-wrap gap-1 my-2 mb-4">
              <InteressPill text="Front-end" />
              <InteressPill text="UI/UX Design" />
              <InteressPill text="APIs" />
              <InteressPill text="Banco de Dados" />
            </div>

            <h3 className="font-medium text-lg mt-10">Tecnologias</h3>
            <div className="flex flex-wrap gap-1 my-2 mb-4">
              <TechPill text="React.js" />
              <TechPill text="Next.js" />
              <TechPill text="Tailwind CSS" />
              <TechPill text="TypeScript" />
              <TechPill text="Node.js" />
              <TechPill text="Figma" />
              <TechPill text="Git" />
            </div>
          </section>
        </div>

        <section className="mx-auto mt-10 mb-5">
          <div className="max-w-md">
            <h2 className="text-center text-xl font-medium mb-3">Explorar</h2>
            <p className="text-secondary text-sm text-center">
              Busque por usuários do GitHub para ver seus repositorios, informacões do perfil e
              contribuições
            </p>
          </div>
        </section>

        <form
          className="mt-4 flex w-full items-center gap-2 max-w-2xl mx-auto text-xs md:text-sm"
          onSubmit={handleSearchUser}
        >
          <input
            type="text"
            name="username"
            placeholder="Digite um usuário do GitHub"
            className="w-full rounded-lg border border-card px-3 py-2 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all duration-200 ease-out"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-md border border-primary bg-primary px-4 py-2 font-medium text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MagnifyingGlass size={16} />
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>

        {hasSearched && (
          <section id="profile-user">
            {loading ? (
              <div className="text-center text-secondary text-sm py-8">
                <p>Buscando usuário...</p>
              </div>
            ) : !user ? (
              <div className="text-center text-secondary text-sm py-8">
                <p>Não foi encontrado nenhum usuário</p>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-3 mt-10 lg:flex-row">
                  <div className="lg:basis-1/4">
                    <ProfileInformations
                      name={user.name}
                      username={user.login}
                      description={user.bio}
                      repositories={user.public_repos}
                      followers={user.followers}
                      following={user.following}
                      avatarUrl={user.avatar_url}
                    />
                  </div>
                  <div className="lg:basis-3/4">
                    <Contribuitions username={user.login} isLoading={loading} />
                  </div>
                </div>

                <section>
                  <h3 className="font-medium text-lg my-5">Repositórios</h3>
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
                </section>
              </>
            )}
          </section>
        )}
      </div>
      <Footer />
    </>
  )
}
