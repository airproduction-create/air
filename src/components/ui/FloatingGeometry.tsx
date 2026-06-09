import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useIsDesktop } from '../../hooks/useIsDesktop'

interface FloatingGeometryProps {
  shape: 'ring' | 'diamond' | 'pyramid'
  size?: number
  position: { top?: string; left?: string; right?: string; bottom?: string }
  rotationDuration?: number
  opacity?: number
  color?: string
  delay?: number
}

export function FloatingGeometry({
  shape,
  size = 80,
  position,
  rotationDuration = 12,
  opacity = 0.08,
  color = '#c9a96e',
  delay = 0,
}: FloatingGeometryProps) {
  const isDesktop = useIsDesktop()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [30, -30])

  if (!isDesktop) return null

  return (
    <motion.div
      ref={ref}
      className="absolute pointer-events-none"
      style={{
        ...position,
        width: size,
        height: size,
        y,
        opacity,
      }}
    >
      <motion.div
        animate={{ rotateY: 360, rotateX: shape === 'diamond' ? 360 : 0 }}
        transition={{
          duration: rotationDuration,
          repeat: Infinity,
          ease: 'linear',
          delay,
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {shape === 'ring' && (
          <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="0.75">
            <ellipse cx="50" cy="50" rx="45" ry="45" />
            <ellipse cx="50" cy="50" rx="35" ry="35" strokeOpacity="0.5" />
            <ellipse cx="50" cy="50" rx="25" ry="25" strokeOpacity="0.25" />
          </svg>
        )}
        {shape === 'diamond' && (
          <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="0.75">
            <polygon points="50,5 95,50 50,95 5,50" />
            <polygon points="50,20 80,50 50,80 20,50" strokeOpacity="0.4" />
          </svg>
        )}
        {shape === 'pyramid' && (
          <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="0.75">
            <polygon points="50,10 90,85 10,85" />
            <line x1="50" y1="10" x2="50" y2="85" strokeOpacity="0.3" />
            <polygon points="50,25 75,75 25,75" strokeOpacity="0.35" />
          </svg>
        )}
      </motion.div>
    </motion.div>
  )
}
