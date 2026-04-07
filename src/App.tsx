import { About } from "./components/About";
import { Header } from "./components/Header";
import { InteressPill } from "./components/InteressPill";
import { TechPill } from "./components/TechPill";

export default function App() {
  return (
    <>
      <div className="w-full flex flex-col p-5 max-w-6xl mx-auto">
        <img src="octocat.png" alt="" className="w-40 h-40 mx-auto" />

        <Header />
        <About />


        <h3 className="font-medium text-xl">Interesses</h3>
        <div className="flex flex-wrap gap-1 my-2 mb-4">
          <InteressPill text="Interesse 1" />
          <InteressPill text="Interesse 2" />
          <InteressPill text="Interesse 3" />
        </div>


        <h3 className="font-medium text-xl">Tecnologias</h3>
        <div className="flex flex-wrap gap-1 my-2 mb-4">
          <TechPill text="Tecnologia 1" />
          <TechPill text="Tecnologia 2" />
          <TechPill text="Tecnologia 3" />
        </div>

      </div>
    </>
  )
}
