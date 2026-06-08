import { motion } from 'framer-motion'

interface RevealTextProps {
    children: React.ReactNode
    className?: string
    delay?: number
    depth?: boolean
    direction?: 'up' | 'left' | 'right'
}

export function RevealText({
    children,
    className = '',
    delay = 0,
    depth = false,
    direction = 'up',
}: RevealTextProps) {
    const directionMap = {
          up: { y: 16, x: 0 },
          left: { y: 0, x: -20 },
          right: { y: 0, x: 20 },
    }

  const d = directionMap[direction]

  return (
        <motion.div
                initial={{
                          opacity: 0,
                          y: d.y,
                          x: d.x,
                }}
                whileInView={{
                          opacity: 1,
                          y: 0
                          x: 0,
                }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{
                          duration: 0.5,
                          delay: delay / 1000,
                          ease: [0.16, 1, 0.3, 1],
                }}
                className={className}
                style={depth ? { transformStyle: 'preserve-3d' } : undefined}
              >
          {children}
        </motion.div>
      )
}
