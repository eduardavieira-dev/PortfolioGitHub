import { About } from './components/About'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { InteressPill } from './components/InteressPill'
import { ProfileSection } from './components/ProfileSection'
import { TechPill } from './components/TechPill'

export default function App() {
  return (
    <>
      <div className="w-full flex flex-col pt-15 px-8 max-w-6xl mx-auto md:px-15">
        <Header />

        <div className="py-3 grid gap-6 md:grid-cols-3 pb-10 border-b border-card">
          <div className="md:col-span-1">
            <ProfileSection />
          </div>

          <section className="md:col-span-2">
            <About />

            <h3 className="font-medium text-xl">Interesses</h3>
            <div className="flex flex-wrap gap-1 my-2 mb-4">
              <InteressPill text="Front-end" />
              <InteressPill text="UI/UX Design" />
              <InteressPill text="APIs" />
              <InteressPill text="Banco de Dados" />
            </div>

            <h3 className="font-medium text-xl mt-10">Tecnologias</h3>
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
        

      </div>
        <Footer />
    </>
  )
}
