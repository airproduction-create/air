import { useState } from 'react'
import { portfolioItems } from '../../data/portfolio'
import { RevealText } from '../ui/RevealText'
import { Tag } from '../ui/Tag'

export function Portfolio() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section id="portfolio" className="py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <RevealText className="mb-20">
          <span className="section-label block mb-4">— Selected Work</span>
          <h2 className="font-serif text-4xl lg:text-6xl font-medium text-cream leading-tight">
            Three projects.<br />
            <span className="italic text-gradient">Each a revelation.</span>
          </h2>
        </RevealText>

        {/* Portfolio grid */}
        <div className="space-y-2">
          {portfolioItems.map((item, i) => (
            <RevealText key={item.id} delay={i * 100}>
              <article
                className={`group border border-border transition-all duration-500 cursor-pointer ${
                  active === item.id ? 'border-border-light' : 'hover:border-border-light'
                }`}
                onClick={() => setActive(active === item.id ? null : item.id)}
                data-cursor
              >
                {/* Collapsed view */}
                <div className="grid grid-cols-12 gap-6 p-6 lg:p-8">
                  <div className="col-span-1 flex items-start">
                    <span className="font-mono text-xs text-muted mt-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="col-span-7 lg:col-span-6">
                    <h3 className="font-serif text-2xl lg:text-3xl text-cream mb-2 group-hover:text-gold transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm text-muted">{item.category}</p>
                  </div>
                  <div className="col-span-4 lg:col-span-4 flex flex-wrap gap-2 items-start justify-end">
                    {item.tags.slice(0, 2).map((tag) => (
                      <Tag key={tag} label={tag} />
                    ))}
                  </div>
                  <div className="col-span-12 lg:col-span-1 flex items-start justify-end">
                    <div
                      className={`w-6 h-6 border border-border flex items-center justify-center transition-all duration-300 ${
                        active === item.id ? 'border-gold rotate-45' : 'group-hover:border-border-light'
                      }`}
                    >
                      <span className="text-muted text-xs leading-none">+</span>
                    </div>
                  </div>
                </div>

                {/* Expanded view */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    active === item.id ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="border-t border-border">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      {/* Image */}
                      <div className="relative overflow-hidden aspect-video lg:aspect-auto lg:min-h-[300px]">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/60" />
                        <div className="absolute bottom-4 left-4">
                          <span className="font-mono text-xs text-muted">{item.year}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 lg:p-10 flex flex-col gap-6">
                        <div>
                          <p className="font-mono text-xs text-gold tracking-widest uppercase mb-2">
                            {item.client}
                          </p>
                          <p className="font-sans text-cream-dim leading-relaxed text-sm">
                            {item.narrative}
                          </p>
                        </div>
                        <div className="border-t border-border pt-6">
                          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-2">Impact</p>
                          <p className="font-sans text-sm text-cream-dim leading-relaxed">
                            {item.impact}
                          </p>
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
