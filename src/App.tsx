import { About } from './components/About'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { InteressPill } from './components/InteressPill'
import { ProfileSection } from './components/ProfileSection'
import { TechPill } from './components/TechPill'
import { MagnifyingGlass } from '@phosphor-icons/react'

export default function App() {
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

        <section className="mx-auto my-10">
          <div className="max-w-lg">
            <h2 className="text-center text-xl font-medium mb-3">Explorar</h2>
            <p className="text-secondary text-center">
              Busque por usuários do GitHub para ver seus repositorios, informacões do perfil e
              contribuições
            </p>
          </div>
        </section>

        <form className="mt-4 flex w-full items-center gap-2 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Digite um usuário do GitHub"
            className="w-full rounded-md border border-card px-3 py-2 text-sm outline-none focus:border-primary"
            required
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors"
          >
            <MagnifyingGlass size={16} />
            Buscar
          </button>
        </form>
      </div>
      <Footer />
    </>
  )
}
