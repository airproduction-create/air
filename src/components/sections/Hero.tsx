import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useIsDesktop } from '../../hooks/useIsDesktop'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const isDesktop = useIsDesktop()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const scrollFade = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-void"
    >
      {/* Studio-light backdrop: soft light pooling top-centre, fading to black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% -10%, #242428 0%, #141416 34%, #0a0a0b 62%, #060606 100%)',
        }}
      />

      {/* Full-bleed B&W portrait (placeholder)
          Swap the inner block for <img src="/hero.jpg" className="h-full w-full object-cover object-top grayscale" />
          once a real B&W portrait is provided. */}
      <motion.div
        className="absolute inset-x-0 bottom-0 top-0 flex items-end justify-center pointer-events-none"
        style={{ y: isDesktop ? portraitY : 0 }}
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="relative h-[88%] w-[clamp(300px,40vw,560px)] grayscale"
          style={{
            background:
              'radial-gradient(56% 38% at 50% 30%, #6a6a72 0%, #3a3a40 26%, #1c1c20 55%, #101012 74%, transparent 86%)',
            WebkitMaskImage:
              'radial-gradient(74% 92% at 50% 42%, #000 58%, transparent 94%)',
            maskImage:
              'radial-gradient(74% 92% at 50% 42%, #000 58%, transparent 94%)',
          }}
        >
          {/* head + shoulders silhouette hint + soft rim light */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(20% 15% at 50% 30%, rgba(235,235,240,0.22) 0%, transparent 72%), radial-gradient(42% 30% at 50% 80%, rgba(200,200,210,0.10) 0%, transparent 78%), radial-gradient(60% 60% at 62% 26%, rgba(255,255,255,0.08) 0%, transparent 55%)',
            }}
          />
        </div>
      </motion.div>

      {/* Vignette to seat the portrait into the background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(80% 70% at 50% 50%, transparent 40%, rgba(6,6,6,0.55) 100%)',
        }}
      />

      {/* Orange circular scroll button — Arqos signature */}
      <motion.a
        href="#intro"
        data-cursor
        aria-label="Scroll to explore"
        className="absolute left-1/2 -translate-x-1/2 bottom-[34%] z-20 flex items-center justify-center w-16 h-16 rounded-full bg-gold text-void"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ opacity: isDesktop ? scrollFade : undefined }}
        whileHover={{ scale: 1.08 }}
      >
        <motion.svg
          width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.a>

      {/* Bottom band: headline + value prop + CTAs (left), tagline (right) */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-10"
        style={{ y: isDesktop ? textY : 0 }}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pb-12 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-end">
            {/* Left: headline + clarity line + CTAs */}
            <div className="lg:col-span-8">
              <motion.h1
                className="font-display font-medium text-cream leading-[0.95] tracking-tight flex items-start"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 5rem)' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                We don't make content.
                <span className="text-gold text-[0.35em] ml-1 mt-[0.1em]">®</span>
              </motion.h1>
              <motion.p
                className="font-display font-medium text-muted leading-[0.95] tracking-tight mb-6"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 5rem)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              >
                We reveal truth.
              </motion.p>
              <motion.div
                className="flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <a href="#contact" data-cursor className="btn-primary btn-glow">Begin</a>
                <a href="#portfolio" data-cursor className="btn-ghost">See the Work</a>
              </motion.div>
            </div>

            {/* Right: what we do */}
            <motion.p
              className="lg:col-span-4 font-sans text-sm lg:text-base text-cream-dim leading-relaxed max-w-sm lg:text-right lg:ml-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
            >
              An AI-native studio making cinematic advertising &amp; branded content — for brands that
              want to be understood, not merely seen.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
