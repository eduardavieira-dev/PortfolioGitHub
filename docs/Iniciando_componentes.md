
Como criar um componente:

1. Crie o arquivo `Header.tsx`.
2. Declare e exporte a função do componente.
3. Retorne o JSX desejado (pode ser dentro de uma `<div>` ou `<>` fragmento).

Exemplo:
```typescript
export function Header() {
  return (
    <header className="text-center mb-6">
      <h1 className="text-3xl font-semibold">Github Stats & Portifolio</h1>
      <p className="text-sm">Explore perfis e repositórios do GitHub</p>
    </header>
  )
}
```

Para usar o componente no seu `App.tsx`:
```typescript
import { Header } from "./Header"

export function App() {
  return (
    <>
      <Header />
    </>
  )
}
```
---
Criando um componente com props:

1. Defina o tipo das props usando `interface` ou `type`.
2. Receba as props como parâmetro da função.
3. Use as props no JSX como desejar.

Exemplo:
```typescript
interface InteressPillProps {
  text: string
}

export function InteressPill({ text }: InteressPillProps) {
  return (
    <div className="bg-primary text-primary rounded-full px-3 py-1 text-xs font-medium">
      <span>{text}</span>
    </div>
  )
}
```

Você fará exatamente a mesma coisa com o TechPill, apenas mudando as classes de primary para secondary.

---

## Componente de Perfil com Ícones Reutilizáveis

No componente de perfil, organizamos as informações e usamos um componente genérico para os ícones sociais. Assim, o código fica limpo e fácil de manter.

**Exemplo:**
```typescript
import { EnvelopeSimple, GithubLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'
import { SocialIcons } from './SocialIcons'

export function ProfileSection() {
  return (
    <div className="flex flex-col gap-1 text-center">
      <img src="octocat.png" alt="octocat" className="w-40 h-40 mx-auto" />
      <h4 className="text-lg font-medium">Eduarda Vieira</h4>
      <span className="text-secondary text-xs">@eduardavieira-dev</span>
      <p className="text-xs">Estudante de Engenharia de Software</p>
      <span className="font-semibold text-xs">PUC Minas</span>
      <div className="flex gap-1 justify-center my-2">
        <SocialIcons link="https://www.instagram.com/eduardavieira.dev/" iconName="Instagram" icon={<InstagramLogo size={18} />} />
        <SocialIcons link="mailto:seuemail@exemplo.com" iconName="Email" icon={<EnvelopeSimple size={18} />} />
        <SocialIcons link="https://www.linkedin.com/in/eduarda-vieira-gon%C3%A7alves-01a584297/" iconName="LinkedIn" icon={<LinkedinLogo size={18} />} />
        <SocialIcons link="https://github.com/eduardavieira-dev" iconName="GitHub" icon={<GithubLogo size={18} />} />
      </div>
    </div>
  )
}
```

O componente `SocialIcons` recebe o link, o nome e o ícone. Assim, você pode adicionar ou trocar redes sociais facilmente:

```typescript
import type { ReactNode } from 'react'

interface SocialIconsProps {
  link: string
  iconName: string
  icon: ReactNode
}

export function SocialIcons({ link, iconName, icon }: SocialIconsProps) {
  return (
    <div className="bg-primary flex items-center justify-center rounded-md p-1">
      <a
        href={link}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={iconName}
        className="text-primary"
        title={iconName}
      >
        {icon}
      </a>
    </div>
  )
}
```

**Resumo:**
- O padrão visual dos ícones é sempre o mesmo, só mudam o conteúdo e o link.
- Isso deixa o código mais limpo, fácil de manter e de expandir.

