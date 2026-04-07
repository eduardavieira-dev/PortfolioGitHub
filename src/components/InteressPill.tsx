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