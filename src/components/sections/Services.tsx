import { useState, useEffect, useRef } from 'react'
import type { Service } from '../../types'
import { RevealText } from '../ui/RevealText'
import { useServices } from '../../hooks/useServices'

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

const iconPaths: Record<string, string> = {
  film: 'M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
  building: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  cpu: 'M9 3H7a2 2 0 00-2 2v2M9 3h6M9 3v2M15 3h2a2 2 0 012 2v2M15 3v2M3 9v6m18-6v6M3 15h2M19 15h2M7 21h2m6 0h2M9 21v-2m6 0v2M7 7h10v10H7z',
}

export function Services() {
  const isDesktop = useIsDesktop()
  const { items: services } = useServices()

  return (
    <section id="services" className="py-32 lg:py-40 bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <RevealText className="mb-20">
          <span className="section-label block mb-4">— Who We Work With</span>
          <h2 className="font-serif text-4xl lg:text-6xl font-medium text-cream leading-tight">
            Intelligence applied<br />
            <span className="text-muted">to your specific problem.</span>
          </h2>
        </RevealText>

        {/* Service cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border">
          {services.map((service, i) => (
            <RevealText key={service.id} delay={i * 150}>
              <ServiceCard service={service} isDesktop={isDesktop} />
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

/* ── Individual service card with hover reveal ────────────────────────────── */
function ServiceCard({
  service,
  isDesktop,
}: {
  service: Service
  isDesktop: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setTilt({
      x: ((e.clientY - cy) / rect.height) * -6,
      y: ((e.clientX - cx) / rect.width) * 6,
    })
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div
      ref={cardRef}
      className="bg-obsidian h-full relative overflow-hidden"
      onMouseEnter={() => isDesktop && setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isDesktop && hovered
          ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(4px)`
          : 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)',
        transition: hovered ? 'transform 0.1s linear' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: hovered ? 1 : 0,
      }}
    >
      {/* Gold border reveal on hover */}
      <div
        className="absolute inset-0 border transition-opacity duration-500"
        style={{
          borderColor: '#C1703F',
          opacity: isDesktop && hovered ? 0.25 : 0,
        }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,87,0,0.06) 0%, transparent 100%)',
          opacity: isDesktop && hovered ? 1 : 0,
        }}
      />

      <div className="p-10 h-full flex flex-col gap-6 relative z-10">
        {/* Icon */}
        <div
          className="w-10 h-10 border flex items-center justify-center transition-all duration-300"
          style={{
            borderColor: hovered ? '#C1703F' : '#3A3327',
          }}
        >
          <svg
            width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="1.5"
            style={{ color: hovered ? '#C1703F' : '#7C7361', transition: 'color 0.3s' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={iconPaths[service.icon]} />
          </svg>
        </div>

        {/* Audience */}
        <span className="font-mono text-xs text-gold tracking-ultra uppercase">
          {service.audience}
        </span>

        {/* Title */}
        <div>
          <h3
            className="font-serif text-2xl text-cream mb-4 leading-snug transition-colors duration-300"
            style={{ color: hovered ? '#C1703F' : undefined }}
          >
            {service.title}
          </h3>
          <p className="font-sans text-sm text-muted leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Capabilities — always visible on mobile, slide up on desktop hover */}
        <div
          className="mt-auto pt-6 border-t border-border"
          style={isDesktop ? {
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            transitionDelay: hovered ? '0.05s' : '0s',
          } : {}}
        >
          <p className="font-mono text-xs text-gold tracking-widest uppercase mb-4">
            {isDesktop ? 'Capabilities' : ''}
          </p>
          <ul className="flex flex-col gap-2">
            {service.capabilities.map((cap, j) => (
              <li
                key={cap}
                className="flex items-start gap-3"
                style={isDesktop ? {
                  opacity: hovered ? 1 : 0,
                  transform: hovered ? 'translateX(0)' : 'translateX(-8px)',
                  transition: `opacity 0.3s ease ${0.05 + j * 0.04}s, transform 0.3s ease ${0.05 + j * 0.04}s`,
                } : {}}
              >
                <span className="text-gold text-xs mt-0.5 shrink-0">—</span>
                <span className="font-sans text-xs text-muted leading-relaxed">{cap}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Static capabilities for mobile */}
        {!isDesktop && (
          <div className="mt-auto pt-6 border-t border-border">
            <ul className="flex flex-col gap-2">
              {service.capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-3">
                  <span className="text-gold text-xs mt-0.5 shrink-0">—</span>
                  <span className="font-sans text-xs text-muted leading-relaxed">{cap}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Corner accent on hover */}
      <div
        className="absolute bottom-0 right-0 w-12 h-12 transition-all duration-500"
        style={{
          background: 'linear-gradient(135deg, transparent 50%, rgba(255,87,0,0.1) 50%)',
          opacity: isDesktop && hovered ? 1 : 0,
        }}
      />
    </div>
  )
}
