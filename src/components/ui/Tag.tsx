interface TagProps {
  label: string
  variant?: 'default' | 'gold' | 'dim'
}

export function Tag({ label, variant = 'default' }: TagProps) {
  const styles = {
    default: 'border-border text-muted',
    gold: 'border-gold-dim text-gold',
    dim: 'border-border text-muted',
  }

  return (
    <span
      className={`inline-block px-3 py-1 border font-mono text-xs tracking-widest uppercase ${styles[variant]}`}
    >
      {label}
    </span>
  )
}
