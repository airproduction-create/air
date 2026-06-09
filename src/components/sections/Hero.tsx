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
  const glowX = useTransform(mouseX, (v: number) => `${v * 100}%`)
  const glowY = useTransform(mouseY, (v: number) => `${v * 100}%`)
  const glowBg = useTransform(
