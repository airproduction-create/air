import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioItems } from '../../data/portfolio'
import { RevealText } from '../ui/RevealText'
import { Tag } from '../ui/Tag'
import { useIsDesktop } from '../../hooks/useIsDesktop'

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
              <motion.article
                className={`group border transition-all duration-500 cursor-pointer relative overflow-hidden ${
                  active === item.id
                    ? 'border-gold/30 glass-strong'
                    : hovered === item.id && isDesktop
                    ? 'border-border-light glass'
                    : 'border-border'
                }`}
                onClick={() => setActive(active === item.id ? null : item.id)}
                onMouseEnter={() => isDesktop && setHovered(item.id)}
                onMouseLeave={() => isDesktop && setHovered(null)}
                data-cursor
                whileHover={isDesktop ? { translateZ: 10 } : undefined}
                style={{ transformPerspective: 1000 }}
              >
                {/* Desktop hover: image bleeds in from right */}
                {isDesktop && (
                  <motion.div
                    className="absolute inset-y-0 right-0 w-64 pointer-events-none"
                    initial={false}
                    animate={{
                      opacity: hovered === item.id && active !== item.id ? 1 : 0,
                      x: hovered === item.id && active !== item.id ? 0 : 40,
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img
                      src={item.thumbnail}
                      alt=""
                      className="w-full h-full object-cover grayscale"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/70 to-transparent" />
                  </motion.div>
                )}

                {/* Collapsed row */}
                <div className="grid grid-cols-12 gap-4 p-6 lg:p-8 relative z-10">
                  {/* Index — gold text-shadow glow */}
                  <div className="col-span-1 flex items-center">
                    <span
                      className="font-mono text-xs transition-colors duration-300"
                      style={{
                        color: hovered === item.id || active === item.id ? '#c9a96e' : '#6b6b6b',
                        textShadow: hovered === item.id || active === item.id
                          ? '0 0 12px rgba(201,169,110,0.4)'
                          : 'none',
                      }}
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
                    <motion.div
                      className="w-6 h-6 border flex items-center justify-center"
                      style={{
                        borderColor: active === item.id ? '#c9a96e' : '#2a2a2a',
                      }}
                      animate={{ rotate: active === item.id ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="text-muted text-xs leading-none">+</span>
                    </motion.div>
                  </div>
                </div>

                {/* Hover teaser line — desktop only */}
                {isDesktop && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-px bg-gold"
                    initial={false}
                    animate={{
                      width: hovered === item.id || active === item.id ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.5 }}
                  />
                )}

                {/* Expanded view */}
                <AnimatePresence>
                  {active === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                          {/* Video or image */}
                          <div className="relative overflow-hidden aspect-video lg:aspect-auto lg:min-h-[320px]">
                            {item.vimeoId ? (
                              <>
                                <iframe
                                  src={`https://player.vimeo.com/video/${item.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
                                  frameBorder="0"
                                  allow="autoplay; fullscreen; picture-in-picture"
                                  allowFullScreen
                                  className="absolute inset-0 w-full h-full"
                                  title={item.title}
                                />
                                <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                                  <span className="font-mono text-xs text-muted">{item.year}</span>
                                </div>
                              </>
                            ) : (
                              <>
                                <motion.img
                                  src={item.thumbnail}
                                  alt={item.title}
                                  className="w-full h-full object-cover grayscale-[40%]"
                                  loading="lazy"
                                  whileHover={isDesktop ? { scale: 1, rotateY: -3 } : undefined}
                                  initial={{ scale: 1.05 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.7 }}
                                  style={{ transformPerspective: 800 }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/70" />
                                <div className="absolute bottom-4 left-4">
                                  <span className="font-mono text-xs text-muted">{item.year}</span>
                                </div>
                              </>
                            )}
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            </RevealText>
          ))}
        </div>

        <RevealText className="mt-20 pt-16 border-t border-border">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <p className="font-mono text-xs text-gold tracking-widest uppercase mb-3">— Next</p>
              <h3 className="font-serif text-2xl lg:text-3xl text-cream leading-tight">
                Have a project that needs<br className="hidden lg:block" />
                <span className="italic text-gradient"> the same rigour?</span>
              </h3>
            </div>
            <a href="#contact" data-cursor className="btn-primary shrink-0">
              Commission a Project →
            </a>
          </div>
        </RevealText>
      </div>
    </section>
  )
}
