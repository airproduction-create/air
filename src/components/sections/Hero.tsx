import { useEffect, useState } from 'react'

export function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,169,110,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 100%)',
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

        {/* Main headline */}
        <div className="overflow-hidden mb-6">
          <h1
            className={`font-serif text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-medium text-cream leading-[0.95] transition-all duration-1000 delay-100 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
            }`}
          >
            We don't
          </h1>
        </div>
        <div className="overflow-hidden mb-6">
          <h1
            className={`font-serif text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-medium italic text-gradient leading-[0.95] transition-all duration-1000 delay-200 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
            }`}
          >
            make content.
          </h1>
        </div>
        <div className="overflow-hidden mb-16">
          <h1
            className={`font-serif text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-medium text-cream leading-[0.95] transition-all duration-1000 delay-300 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
            }`}
          >
            We reveal truth.
          </h1>
        </div>

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
              <a href="#portfolio" data-cursor className="btn-primary">
                See the Work
              </a>
              <a href="#quiz" data-cursor className="btn-ghost">
                Reveal Yourself
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col justify-center gap-8 lg:pl-12 lg:border-l lg:border-border">
            {[
              { value: 'AI-Native', label: 'Production Methodology' },
              { value: '3 Continents', label: 'Production Footprint' },
              { value: '100%', label: 'Human Insight at the Core' },
            ].map((stat) => (
              <div key={stat.label}>
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
