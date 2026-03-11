import { useEffect, useRef, useState } from 'react'

interface WingDividerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  opacity?: number
}

export function WingDivider({ className = '', size = 'md', opacity = 0.35 }: WingDividerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  const widths = { sm: 'w-32 lg:w-40', md: 'w-48 lg:w-64', lg: 'w-64 lg:w-96' }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el) } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`relative flex items-center justify-center py-12 lg:py-16 overflow-hidden ${className}`}>
      {/* Left rule — expands from center */}
      <div
        className="absolute left-0 right-1/2 h-px transition-all duration-1200 ease-out"
        style={{
          background: 'linear-gradient(to left, rgba(201,169,110,0.35), transparent)',
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'right',
          transitionDuration: '1.2s',
        }}
      />
      {/* Right rule */}
      <div
        className="absolute left-1/2 right-0 h-px transition-all duration-1200 ease-out"
        style={{
          background: 'linear-gradient(to right, rgba(201,169,110,0.35), transparent)',
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transitionDuration: '1.2s',
        }}
      />

      {/* Wings SVG */}
      <svg
        viewBox="0 0 280 64"
        className={`${widths[size]} h-auto`}
        style={{
          opacity: visible ? opacity : 0,
          transform: visible ? 'scaleX(1)' : 'scaleX(0.3)',
          transition: 'opacity 1s ease 0.2s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
        }}
        fill="none"
        stroke="#c9a96e"
        strokeWidth="0.75"
      >
        {/* Left wing — outer feather line */}
        <path d="M140,32 C125,18 100,8 65,10 C42,11 18,20 0,32" strokeOpacity="0.6" />
        {/* Left wing — mid feather */}
        <path d="M140,32 C122,22 95,14 58,16 C36,17 16,24 0,32" strokeOpacity="0.35" />
        {/* Left wing — inner feather */}
        <path d="M140,32 C118,26 90,20 52,22" strokeOpacity="0.2" />
        {/* Left wing — body fill hint */}
        <path d="M140,32 C130,24 112,16 80,14 C58,13 30,18 8,28" strokeOpacity="0.15" />

        {/* Right wing — outer feather line */}
        <path d="M140,32 C155,18 180,8 215,10 C238,11 262,20 280,32" strokeOpacity="0.6" />
        {/* Right wing — mid feather */}
        <path d="M140,32 C158,22 185,14 222,16 C244,17 264,24 280,32" strokeOpacity="0.35" />
        {/* Right wing — inner feather */}
        <path d="M140,32 C162,26 190,20 228,22" strokeOpacity="0.2" />
        {/* Right wing — body fill hint */}
        <path d="M140,32 C150,24 168,16 200,14 C222,13 250,18 272,28" strokeOpacity="0.15" />

        {/* Centre mark */}
        <circle cx="140" cy="32" r="1.5" fill="#c9a96e" fillOpacity="0.5" stroke="none" />
        <circle cx="140" cy="32" r="4" strokeOpacity="0.25" />
        <circle cx="140" cy="32" r="7" strokeOpacity="0.12" />
      </svg>
    </div>
  )
}

/* ── Background wing watermark (used inside sections) ─────────────────────── */
export function WingWatermark({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 560 128"
        className="w-full max-w-4xl h-auto opacity-[0.025]"
        fill="none"
        stroke="#c9a96e"
        strokeWidth="1"
      >
        <path d="M280,64 C250,36 200,16 130,20 C84,22 36,40 0,64" />
        <path d="M280,64 C244,44 190,28 116,32 C72,34 28,50 0,64" />
        <path d="M280,64 C238,52 180,40 104,44" />
        <path d="M280,64 C330,36 380,16 450,20 C496,22 524,40 560,64" />
        <path d="M280,64 C316,44 370,28 444,32 C488,34 532,50 560,64" />
        <path d="M280,64 C322,52 380,40 456,44" />
        <circle cx="280" cy="64" r="3" fill="#c9a96e" stroke="none" />
        <circle cx="280" cy="64" r="8" />
        <circle cx="280" cy="64" r="14" />
      </svg>
    </div>
  )
}
