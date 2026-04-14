import { EnvelopeSimple, GithubLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'
import { SocialIcons } from './SocialIcons'

export function ProfileSection() {
  return (
    <div className="flex flex-col gap-1 text-center">
      <img src="octocat.png" alt="octocat" className="w-40 h-40 mx-auto" />
      <h4 className="text-lg font-medium">Eduarda Vieira</h4>
      <span className="text-secondary text-xs">@eduardavieira-dev</span>
      <p className=" text-xs">Estudante de Engenharia de Software </p>
      <span className="font-semibold text-xs">PUC Minas</span>
      <div className="flex gap-1 justify-center my-2">
        <SocialIcons
          link="https://www.instagram.com/eduardavieira.dev/"
          iconName="Instagram"
          icon={<InstagramLogo size={18} />}
        />
        <SocialIcons
          link="mailto:seuemail@exemplo.com"
          iconName="Email"
          icon={<EnvelopeSimple size={18} />}
        />
        <SocialIcons
          link="https://www.linkedin.com/in/eduarda-vieira-gon%C3%A7alves-01a584297/"
          iconName="LinkedIn"
          icon={<LinkedinLogo size={18} />}
        />
        <SocialIcons
          link="https://github.com/eduardavieira-dev"
          iconName="GitHub"
          icon={<GithubLogo size={18} />}
        />
      </div>
    </div>
  )
}
