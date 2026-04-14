interface Repository {
  name: string
  username: string
  description: string
  repositories: number
  followers: number
  following: number
  avatarUrl?: string
}

export function ProfileInformations({
  name,
  username,
  description,
  repositories,
  followers,
  following,
  avatarUrl,
}: Repository) {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-1 mx-auto max-w-md">
        <img
          src={avatarUrl || 'https://via.placeholder.com/120'}
          alt={username}
          className="w-30 h-30 m-2 mx-auto md:mr-2 rounded-full object-cover"
        />
        <div className="flex flex-col gap-1 justify-center text-center md:text-left max-w-md">
          <h4 className="text-lg font-medium" id="name">
            {name}
          </h4>
          <span className="text-secondary text-xs" id="username">
            @{username}
          </span>
          <p className="text-xs text-secondary" id="description">
            {description}
          </p>
        </div>
      </div>
      <div className="flex w-full gap-2 mx-auto max-w-md text-neutral-600 mt-4">
        <div className="border border-card text-center rounded-lg p-4 flex flex-col items-center w-full bg-card">
          <p id="repositories">{repositories}</p>
          <span className="text-sm">Repositórios</span>
        </div>
        <div className="border border-card text-center rounded-lg p-4 flex flex-col items-center w-full bg-card">
          <p id="followers">{followers}</p>
          <span className="text-sm">Seguidores</span>
        </div>
        <div className="border border-card text-center rounded-lg p-4 flex flex-col items-center w-full bg-card">
          <p id="following">{following}</p>
          <span className="text-sm">Seguindo</span>
        </div>
      </div>
    </div>
  )
}
