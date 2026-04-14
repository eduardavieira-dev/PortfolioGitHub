import { GitHubCalendar } from 'react-github-calendar'

interface ContribuitionsProps {
  username?: string
  isLoading?: boolean
}

const roseTheme = {
  light: ['#fff8fa', '#ffdde9', '#ff9ec2', '#ff5d99', '#f02779'],
  dark: ['#3a0a22', '#6e1240', '#a31c5e', '#d9257f', '#f35aa2'],
}

export function Contribuitions({ username, isLoading = false }: ContribuitionsProps) {
  if (isLoading) {
    return (
      <section className="mt-3 w-full">
        <h3 className="text-lg font-medium mb-2">Contribuições</h3>
        <div className="w-full min-h-[170px] animate-pulse rounded-lg border border-card bg-pink-50" />
      </section>
    )
  }

  if (!username) {
    return null
  }

  return (
    <section className="mt-3 w-full">
      <h3 className="text-lg font-medium mb-2">Contribuições</h3>
      <div className="w-full overflow-x-auto rounded-lg border border-card p-3">
        <GitHubCalendar
          username={username}
          colorScheme="light"
          theme={roseTheme}
          blockSize={10}
          blockMargin={3}
          fontSize={11}
          showColorLegend={false}
          errorMessage="Nao foi possivel carregar as contribuicoes agora."
          labels={{
            totalCount: '{{count}} contribuições no último ano',
          }}
        />
      </div>
    </section>
  )
}
