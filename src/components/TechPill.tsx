interface TechPillProps {
  text: string
}

export function TechPill({ text }: TechPillProps) {
  return (
    <div className="bg-secondary text-secondary rounded-full px-3 py-1 text-xs font-medium">
      <span>{text}</span>
    </div>
  )
}