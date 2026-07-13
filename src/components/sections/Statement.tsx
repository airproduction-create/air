import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Big two-tone editorial statement — Arqos "// Empowered by AI. Driven by
 * Human Vision." equivalent, in AIR's voice. Emphasis line resolves to white
 * as it scrolls into view; the continuation stays muted.
 */
export function Statement() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.35'],
  })
  const emphasis = useTransform(scrollYProgress, [0, 1], ['#8f8f8f', '#f5f5f4'])

  return (
    <section id="intro" className="bg-void py-40 lg:py-64 overflow-hidden">
      <div ref={ref} className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="lg:max-w-[62%] lg:ml-auto">
          <span className="font-mono text-gold text-2xl lg:text-4xl block mb-6 leading-none">//</span>
          <h2
            className="font-display font-medium tracking-tight leading-[1.02]"
            style={{ fontSize: 'clamp(2.25rem, 5.4vw, 5.25rem)' }}
          >
            <motion.span style={{ color: emphasis }}>Powered by AI.</motion.span>{' '}
            <span className="text-muted">Guided by human truth.</span>
          </h2>
        </div>
      </div>
    </section>
  )
}
