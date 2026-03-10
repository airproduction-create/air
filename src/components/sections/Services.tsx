import { services } from '../../data/services'
import { RevealText } from '../ui/RevealText'

const iconPaths: Record<string, string> = {
  film: 'M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
  building: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  cpu: 'M9 3H7a2 2 0 00-2 2v2M9 3h6M9 3v2M15 3h2a2 2 0 012 2v2M15 3v2M3 9v6m18-6v6M3 15h2M19 15h2M7 21h2m6 0h2M9 21v-2m6 0v2M7 7h10v10H7z',
}

export function Services() {
  return (
    <section id="services" className="py-32 lg:py-40 bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <RevealText className="mb-20">
          <span className="section-label block mb-4">— Who We Work With</span>
          <h2 className="font-serif text-4xl lg:text-6xl font-medium text-cream leading-tight">
            Intelligence applied<br />
            <span className="italic text-gradient">to your specific problem.</span>
          </h2>
        </RevealText>

        {/* Service cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border">
          {services.map((service, i) => (
            <RevealText key={service.id} delay={i * 150}>
              <div className="bg-obsidian p-10 h-full flex flex-col gap-8 group hover:bg-surface transition-colors duration-500">
                {/* Icon */}
                <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-gold transition-colors duration-300">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-muted group-hover:text-gold transition-colors duration-300"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={iconPaths[service.icon]} />
                  </svg>
                </div>

                {/* Audience tag */}
                <div>
                  <span className="font-mono text-xs text-gold tracking-ultra uppercase">
                    {service.audience}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-serif text-2xl text-cream mb-4 leading-snug group-hover:text-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="font-sans text-sm text-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Capabilities */}
                <div className="mt-auto pt-8 border-t border-border">
                  <ul className="flex flex-col gap-2">
                    {service.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-3">
                        <span className="text-gold text-xs mt-0.5 shrink-0">—</span>
                        <span className="font-sans text-xs text-muted leading-relaxed">{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealText>
          ))}
        </div>

        {/* Value proposition strip */}
        <RevealText className="mt-20">
          <div className="border border-border p-8 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-border">
              {[
                {
                  label: 'AI-Native Intelligence',
                  description: 'Our production workflows are built around AI from concept to delivery — compressing timelines without compressing thought.',
                },
                {
                  label: 'Human at the Core',
                  description: 'Every insight that guides our creative is human: earned, observed, understood. AI accelerates; wisdom directs.',
                },
                {
                  label: 'Speed That Reveals',
                  description: 'We don\'t sacrifice quality for speed. We use speed to get to the truth faster — before the brief calcifies into the wrong answer.',
                },
              ].map((item) => (
                <div key={item.label} className="pt-8 md:pt-0 md:px-8 first:pt-0 first:pl-0 last:pr-0">
                  <p className="font-serif text-lg text-cream mb-3">{item.label}</p>
                  <p className="font-sans text-sm text-muted leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealText>
      </div>
    </section>
  )
}
