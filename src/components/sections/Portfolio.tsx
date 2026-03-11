import { useRef, useState, useEffect } from 'react'
import { portfolioItems } from '../../data/portfolio'
import { RevealText } from '../ui/RevealText'
import { Tag } from '../ui/Tag'

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

export function Portfolio() {
  const [active, setActive] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const isDesktop = useIsDesktop()

  return (
    <section id="portfolio" className="py-32 lg:py-40 relative overflow-hidden">
      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <RevealText className="mb-20">
          <span className="section-label block mb-4">— Selected Work</span>
          <h2 className="font-serif text-4xl lg:text-6xl font-medium text-cream leading-tight">
            Three projects.<br />
            <span className="italic text-gradient">Each a revelation.</span>
          </h2>
        </RevealText>

        {/* Portfolio list */}
        <div className="space-y-2">
          {portfolioItems.map((item, i) => (
            <RevealText key={item.id} delay={i * 100}>
              <article
                className={`group border transition-all duration-500 cursor-pointer relative overflow-hidden ${
                  active === item.id
                    ? 'border-gold/30 bg-surface'
                    : hovered === item.id && isDesktop
                    ? 'border-border-light bg-surface/50'
                    : 'border-border'
                }`}
                onClick={() => setActive(active === item.id ? null : item.id)}
                onMouseEnter={() => isDesktop && setHovered(item.id)}
                onMouseLeave={() => isDesktop && setHovered(null)}
                data-cursor
              >
                {/* Desktop hover: image bleeds in from right */}
                {isDesktop && (
                  <div
                    className="absolute inset-y-0 right-0 w-64 pointer-events-none transition-all duration-700"
                    style={{
                      opacity: hovered === item.id && active !== item.id ? 1 : 0,
                      transform: hovered === item.id && active !== item.id
                        ? 'translateX(0)'
                        : 'translateX(40px)',
                    }}
                  >
                    <img
                      src={item.thumbnail}
                      alt=""
                      className="w-full h-full object-cover grayscale"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/70 to-transparent" />
                  </div>
                )}

                {/* Collapsed row */}
                <div className="grid grid-cols-12 gap-4 p-6 lg:p-8 relative z-10">
                  {/* Index */}
                  <div className="col-span-1 flex items-center">
                    <span
                      className="font-mono text-xs transition-colors duration-300"
                      style={{ color: hovered === item.id || active === item.id ? '#c9a96e' : '#6b6b6b' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title + category */}
                  <div className="col-span-7 lg:col-span-6">
                    <h3
                      className="font-serif text-2xl lg:text-3xl text-cream mb-1 transition-all duration-300"
                      style={{
                        color: hovered === item.id || active === item.id ? '#c9a96e' : undefined,
                        transform: isDesktop && hovered === item.id ? 'translateX(6px)' : 'translateX(0)',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm text-muted">{item.category}</p>
                  </div>

                  {/* Tags */}
                  <div className="col-span-3 lg:col-span-4 flex flex-wrap gap-2 items-center justify-end">
                    {item.tags.slice(0, 2).map((tag) => (
                      <Tag key={tag} label={tag} />
                    ))}
                  </div>

                  {/* Expand toggle */}
                  <div className="col-span-1 flex items-center justify-end">
                    <div
                      className="w-6 h-6 border flex items-center justify-center transition-all duration-300"
                      style={{
                        borderColor: active === item.id ? '#c9a96e' : '#2a2a2a',
                        transform: active === item.id ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    >
                      <span className="text-muted text-xs leading-none">+</span>
                    </div>
                  </div>
                </div>

                {/* Hover teaser line — desktop only */}
                {isDesktop && (
                  <div
                    className="absolute bottom-0 left-0 h-px bg-gold transition-all duration-700"
                    style={{
                      width: hovered === item.id || active === item.id ? '100%' : '0%',
                    }}
                  />
                )}

                {/* Expanded view */}
                <div
                  className="overflow-hidden transition-all duration-700"
                  style={{
                    maxHeight: active === item.id ? '700px' : '0px',
                    opacity: active === item.id ? 1 : 0,
                  }}
                >
                  <div className="border-t border-border">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      {/* Image */}
                      <div className="relative overflow-hidden aspect-video lg:aspect-auto lg:min-h-[320px]">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover grayscale-[40%] scale-105 transition-transform duration-700 group-hover:scale-100"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/70" />
                        <div className="absolute bottom-4 left-4">
                          <span className="font-mono text-xs text-muted">{item.year}</span>
                        </div>
                      </div>

                      {/* Case study content */}
                      <div className="p-8 lg:p-10 flex flex-col gap-6">
                        <div>
                          <p className="font-mono text-xs text-gold tracking-widest uppercase mb-3">
                            {item.client}
                          </p>
                          <p className="font-sans text-cream-dim leading-relaxed text-sm">
                            {item.narrative}
                          </p>
                        </div>
                        <div className="border-t border-border pt-6">
                          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-3">The Result</p>
                          <p className="font-sans text-sm text-cream-dim leading-relaxed">
                            {item.impact}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {item.tags.map((tag) => (
                            <Tag key={tag} label={tag} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </RevealText>
          ))}
        </div>

        <RevealText className="mt-12">
          <a href="#contact" data-cursor className="btn-ghost">
            Commission a Project
          </a>
        </RevealText>
      </div>
    </section>
  )
}
