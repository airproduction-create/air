import { useEffect, useRef, useState } from 'react'
import { WingWatermark } from '../ui/WingDivider'

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return isDesktop
}

export function Hero() {
  const [loaded, setLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const sectionRef = useRef<HTMLElement>(null)
  const isDesktop = useIsDesktop()

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Parallax on scroll — desktop only
  useEffect(() => {
    if (!isDesktop) return
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDesktop])

  // Subtle radial glow follows mouse — desktop only
  useEffect(() => {
    if (!isDesktop) return
    const handleMouse = (e: MouseEvent) => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      setMouse({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [isDesktop])

  const parallax = isDesktop ? scrollY * 0.25 : 0

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Wing watermark background */}
      <WingWatermark className="top-1/2 -translate-y-1/2" />

      {/* Background grid — parallax on desktop */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,169,110,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          transform: `translateY(${parallax}px)`,
          transition: 'transform 0.1s linear',
        }}
      />

      {/* Mouse-tracking radial glow — desktop only */}
      {isDesktop && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse 45% 40% at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(201,169,110,0.06) 0%, transparent 100%)`,
          }}
        />
      )}

      {/* Static glow fallback */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,110,0.03) 0%, transparent 100%)',
        }}
      />

      {/* Vertical rule */}
      <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-border" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24">

        {/* Eyebrow */}
        <div
          className={`flex items-center gap-4 mb-12 transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="w-8 h-px bg-gold" />
          <span className="font-mono text-xs text-gold tracking-ultra uppercase">
            Artificial Intelligence Revelations
          </span>
        </div>

        {/* Main headline — lines stagger up */}
        {['We don\'t', 'make content.', 'We reveal truth.'].map((line, i) => (
          <div key={line} className="overflow-hidden mb-4 lg:mb-6">
            <h1
              className={`font-serif text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-medium leading-[0.95] transition-all duration-1000 ${
                i === 1 ? 'italic text-gradient' : 'text-cream'
              } ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
              style={{ transitionDelay: loaded ? `${100 + i * 120}ms` : '0ms' }}
            >
              {line}
            </h1>
          </div>
        ))}

        <div className="mb-16" />

        {/* Supporting text + CTA */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 transition-all duration-700 delay-500 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div>
            <p className="font-sans text-lg text-cream-dim leading-relaxed mb-8 max-w-lg">
              AIR is an AI content studio built on a single conviction: the most powerful
              creative work doesn't persuade — it reveals. We make cinematic advertising,
              branded content, and bespoke campaigns for those who want to be understood,
              not merely seen.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton href="#portfolio" primary>See the Work</MagneticButton>
              <MagneticButton href="#quiz">Reveal Yourself</MagneticButton>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col justify-center gap-8 lg:pl-12 lg:border-l lg:border-border">
            {[
              { value: 'AI-Native', label: 'Production Methodology' },
              { value: '3 Continents', label: 'Production Footprint' },
              { value: '100%', label: 'Human Insight at the Core' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                style={{ transitionDelay: `${700 + i * 120}ms` }}
              >
                <p className="font-serif text-2xl text-gold mb-1">{stat.value}</p>
                <p className="font-mono text-xs text-muted tracking-widest uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-6 lg:left-12 flex flex-col items-center gap-3 transition-all duration-700 delay-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent animate-pulse-slow" />
        <span className="font-mono text-xs text-muted tracking-ultra rotate-90 origin-center mt-2">Scroll</span>
      </div>
    </section>
  )
}

/* ── Magnetic button — desktop only ─────────────────────────────────────── */
function MagneticButton({
  href,
  children,
  primary = false,
}: {
  href: string
  children: React.ReactNode
  primary?: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const isDesktop = useIsDesktop()
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setOffset({
      x: (e.clientX - cx) * 0.25,
      y: (e.clientY - cy) * 0.25,
    })
  }

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 })

  return (
    <a
      ref={ref}
      href={href}
      data-cursor
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={primary ? 'btn-primary' : 'btn-ghost'}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: offset.x === 0 && offset.y === 0
          ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          : 'transform 0.1s linear',
      }}
    >
      {children}
    </a>
  )
}
