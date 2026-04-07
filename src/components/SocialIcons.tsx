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
