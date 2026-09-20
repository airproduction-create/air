import { useState, useEffect } from 'react'
import { RevealText } from '../ui/RevealText'

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

const principles = [
  {
    number: '01',
    principle: 'Truth before beauty',
    description: 'A beautiful lie is still a lie. A true thing, well-told, always outlasts it.',
    hover: 'The most enduring creative work is specific, not spectacular.',
  },
  {
    number: '02',
    principle: 'Constraint as creative force',
    description: 'The most revelatory work in history emerged under pressure, not despite it.',
    hover: 'Jaws. Just Do It. The Sistine ceiling. All born from refusal.',
  },
  {
    number: '03',
    principle: 'Speed in service of clarity',
    description: 'We use velocity to reach the essential faster — not to avoid the essential entirely.',
    hover: 'Urgency clarifies. The brief under pressure reveals what actually matters.',
  },
  {
    number: '04',
    principle: 'Intelligence without artifice',
    description: 'AI is a tool for revelation, not decoration. We apply it where it earns its place.',
    hover: 'If the AI is visible in the work, we haven\'t used it correctly.',
  },
]

export function About() {
  const [hoveredPrinciple, setHoveredPrinciple] = useState<string | null>(null)
  const isDesktop = useIsDesktop()

  return (
    <section id="about" className="py-32 lg:py-40 border-t border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left: Manifesto */}
          <div>
            <RevealText>
              <span className="section-label block mb-8">— The Philosophy</span>
            </RevealText>
            <RevealText delay={100}>
              <h2 className="font-serif text-4xl lg:text-5xl font-medium text-cream leading-tight mb-8">
                Most creative work<br />
                <span className="text-muted">says too much.</span>
              </h2>
            </RevealText>
            <RevealText delay={200}>
              <p className="font-sans text-cream-dim leading-relaxed mb-6">
                The best advertising in history didn't persuade. It revealed. Ogilvy's Rolls-Royce ad
                didn't claim the car was quiet. It said: "At 60 miles an hour the loudest noise comes
                from the electric clock." One true detail. Absolute trust.
              </p>
            </RevealText>
            <RevealText delay={300}>
              <p className="font-sans text-cream-dim leading-relaxed mb-6">
                We believe the same principle governs all powerful creative work — across advertising,
                film, brand identity, corporate communication. The job isn't to construct a message.
                It's to excavate the one that was already there.
              </p>
            </RevealText>
            <RevealText delay={400}>
              <p className="font-sans text-cream-dim leading-relaxed">
                AI gives us the tools to excavate faster and deeper. Human insight tells us where to dig.
              </p>
            </RevealText>
          </div>

          {/* Right: Principles — editorial bento (01 & 04 lead, full width) */}
          <div className="grid grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {principles.map((item, i) => {
              const isLead = i === 0 || i === 3
              return (
                <RevealText key={item.number} delay={parseInt(item.number) * 80} className={isLead ? 'col-span-2' : ''}>
                  <div
                    className="bg-surface relative overflow-hidden transition-colors duration-300 h-full"
                    style={{ backgroundColor: hoveredPrinciple === item.number && isDesktop ? '#2A2318' : '#211B14' }}
                    onMouseEnter={() => isDesktop && setHoveredPrinciple(item.number)}
                    onMouseLeave={() => isDesktop && setHoveredPrinciple(null)}
                  >
                    {/* Ghost numeral */}
                    <span
                      aria-hidden="true"
                      className="absolute -top-2 right-4 font-display font-extrabold leading-none pointer-events-none select-none transition-all duration-500"
                      style={{
                        fontSize: isLead ? 'clamp(70px,9vw,140px)' : 'clamp(56px,7vw,96px)',
                        color: hoveredPrinciple === item.number && isDesktop ? '#C1703F' : '#EDE4D3',
                        opacity: hoveredPrinciple === item.number && isDesktop ? 0.1 : 0.05,
                      }}
                    >
                      {item.number}
                    </span>

                    {/* Gold left border reveal */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-500"
                      style={{
                        background: '#C1703F',
                        opacity: hoveredPrinciple === item.number && isDesktop ? 1 : 0,
                        transform: hoveredPrinciple === item.number && isDesktop ? 'scaleY(1)' : 'scaleY(0)',
                        transformOrigin: 'top',
                      }}
                    />

                    <div className={isLead ? 'relative p-8 lg:p-10 max-w-[36ch]' : 'relative p-8 h-full flex flex-col'}>
                      <span className="font-mono text-xs text-gold block mb-3">{item.number}</span>
                      <h3
                        className="font-serif text-cream mb-2 transition-colors duration-300"
                        style={{
                          fontSize: isLead ? 'clamp(1.25rem,2.2vw,1.6rem)' : undefined,
                          color: hoveredPrinciple === item.number && isDesktop ? '#C1703F' : undefined,
                        }}
                      >
                        {item.principle}
                      </h3>
                      <p className="font-sans text-sm text-muted leading-relaxed">
                        {item.description}
                      </p>

                      {/* Hover-reveal addendum — desktop only */}
                      {isDesktop && (
                        <p
                          className="font-mono text-xs text-gold/70 leading-relaxed mt-3"
                          style={{
                            maxHeight: hoveredPrinciple === item.number ? '40px' : '0px',
                            opacity: hoveredPrinciple === item.number ? 1 : 0,
                            overflow: 'hidden',
                            transition: 'max-height 0.4s ease, opacity 0.3s ease 0.1s',
                          }}
                        >
                          {item.hover}
                        </p>
                      )}
                    </div>
                  </div>
                </RevealText>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
