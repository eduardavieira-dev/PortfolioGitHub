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
