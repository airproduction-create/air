import { useEffect, useRef } from 'react'
import { useCursor } from '../../hooks/useCursor'

export function CursorEffect() {
  const cursor = useCursor()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    dot.style.transform = `translate(${cursor.x - 4}px, ${cursor.y - 4}px)`
    ring.style.transform = `translate(${cursor.x - 20}px, ${cursor.y - 20}px)`
  }, [cursor.x, cursor.y])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9998] transition-opacity duration-200"
        style={{
          background: cursor.isHovering ? '#e0c080' : '#c9a96e',
          opacity: cursor.x < 0 ? 0 : 1,
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9997]"
        style={{
          border: `1px solid ${cursor.isHovering ? 'rgba(224,192,128,0.6)' : 'rgba(201,169,110,0.3)'}`,
          transform: `translate(${cursor.x - 20}px, ${cursor.y - 20}px)`,
          transition: 'transform 0.12s ease-out, border-color 0.2s ease, width 0.2s ease, height 0.2s ease',
          width: cursor.isHovering ? '56px' : '40px',
          height: cursor.isHovering ? '56px' : '40px',
          marginLeft: cursor.isHovering ? '-8px' : '0',
          marginTop: cursor.isHovering ? '-8px' : '0',
          opacity: cursor.x < 0 ? 0 : 1,
        }}
      />
      {/* Ambient glow that follows cursor */}
      <div
        className="fixed pointer-events-none z-[9996]"
        style={{
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)',
          transform: `translate(${cursor.x - 150}px, ${cursor.y - 150}px)`,
          transition: 'transform 0.3s ease-out',
          opacity: cursor.x < 0 ? 0 : 1,
        }}
      />
    </>
  )
}
