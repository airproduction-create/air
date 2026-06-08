import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'framer-motion'
import { WingWatermark } from '../ui/WingDivider'
import { PerspectiveGrid } from '../ui/PerspectiveGrid'
import { FloatingGeometry } from '../ui/FloatingGeometry'
import { useIsDesktop } from '../../hooks/useIsDesktop'
import { useMouseParallax } from '../../hooks/useMouseParallax'

const headlineLines = ["We don't", 'make content.', 'We reveal truth.']

const stats = [
  { value: 'AI-Native', label: 'Production Methodology' },
  { value: '100%', label: 'Human Insight at the Core' },
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const isDesktop = useIsDesktop()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const gridY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const scrollFade = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const { mouseX, mouseY } = useMouseParallax(0.03)
  const glowX = useTransform(mouseX, (v) => `${v * 100}%`)
  const glowY = useTransform(mouseY, (v) => `${v * 100}%`)
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(ellipse 45% 40% at ${x} ${y}, rgba(201,169,110,0.07) 0%, transparent 100%)`
  )

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Wing watermark background */}
      <WingWatermark className="top-1/2 -translate-y-1/2" />

      {/* 3D Perspective grid floor — desktop only */}
      <PerspectiveGrid />

      {/* Background grid — parallax on desktop */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,169,110,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          y: isDesktop ? gridY : 0,
        }}
      />

      {/* Floating 3D geometry — desktop only */}
      <FloatingGeometry
        shape="ring"
        size={120}
        position={{ top: '15%', right: '8%' }}
        opacity={0.06}
        rotationDuration={14}
      />
      <FloatingGeometry
        shape="diamond"
        size={80}
        position={{ top: '60%', left: '5%' }}
        opacity={0.05}
        rotationDuration={18}
        delay={2}
      />
      <FloatingGeometry
        shape="pyramid"
        size={60}
        position={{ top: '30%', left: '15%' }}
        opacity={0.04}
        rotationDuration={22}
        delay={4}
      />

      {/* Mouse-tracking radial glow — desktop only */}
      {isDesktop && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: glowBg }}
        />
      )}

      {/* Static glow fallback */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,110,0.03) 0%, transparent 100%)',
        }}
      />

      {/* Vertical rule — desktop only */}
      <div className="hidden lg:block absolute left-12 top-0 bottom-0 w-px bg-border" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24">
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-8 h-px bg-gold" />
          <span className="font-mono text-xs text-gold tracking-ultra uppercase">
            Artificial Intelligence Revelations
          </span>
        </motion.div>

        {/* Main headline — staggered spring entrance with depth */}
        <div className={isDesktop ? 'perspective-container' : ''}>
          {headlineLines.map((line, i) => (
            <div key={line} className="overflow-hidden mb-4 lg:mb-6">
              <motion.h1
                className={`font-serif text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-medium leading-[0.95] ${
                  i === 1 ? 'italic text-gradient' : 'text-cream'
                }`}
                initial={{
                  opacity: 0,
                  y: 60,
                  rotateX: isDesktop ? 15 : 0,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.15 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </div>

        <div className="mb-16" />

        {/* Supporting text + CTA */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div>
            <p className="font-sans text-lg text-cream-dim leading-relaxed mb-8 max-w-lg">
              AIR is an AI content studio built on a single conviction: the most
              powerful creative work doesn't persuade — it reveals. We make
              cinematic advertising, branded content, and bespoke campaigns for
              those who want to be understood, not merely seen.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton href="#portfolio" primary>
                See the Work
              </MagneticButton>
              <MagneticButton href="#quiz">Reveal Yourself</MagneticButton>
            </div>
          </div>

          {/* Stats — glass treatment */}
          <div className="flex flex-col justify-center gap-8 lg:pl-12 lg:border-l lg:border-border">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass rounded-lg px-4 py-3 border-gradient"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.7 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <p className="font-serif text-2xl text-gold mb-1">
                  {stat.value}
                </p>
                <p className="font-mono text-xs text-muted tracking-widest uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — fades with scroll */}
      <motion.div
        className="absolute bottom-8 left-8 lg:left-12 hidden sm:flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        style={{ opacity: isDesktop ? scrollFade : undefined }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent animate-pulse-slow" />
        <span className="font-mono text-xs text-muted tracking-ultra rotate-90 origin-center mt-2">
          Scroll
        </span>
      </motion.div>
    </section>
  )
}

/* ── Magnetic button with spring physics ──────────────────────────────── */
function MagneticButton({
  href,
  children,
  primary = false,
}: {
  href: string
  children: React.ReactNode
  primary?: boolean
}) {
  const isDesktop = useIsDesktop()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15 })
  const springY = useSpring(y, { stiffness: 200, damping: 15 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isDesktop) return
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.25)
    y.set((e.clientY - cy) * 0.25)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      href={href}
      data-cursor
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${primary ? 'btn-primary' : 'btn-ghost'} ${primary ? 'btn-glow' : ''}`}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.a>
  )
}
