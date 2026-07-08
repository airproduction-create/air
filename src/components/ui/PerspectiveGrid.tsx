import { useIsDesktop } from '../../hooks/useIsDesktop'

export function PerspectiveGrid() {
  const isDesktop = useIsDesktop()

  if (!isDesktop) return null

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ perspective: '800px' }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          right: '-10%',
          height: '60%',
          backgroundImage: `
            linear-gradient(rgba(255,87,0,0.10) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,87,0,0.10) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'rotateX(65deg)',
          transformOrigin: 'center bottom',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 80%)',
        }}
      />
    </div>
  )
}
