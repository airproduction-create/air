import { useState, useEffect, useCallback } from 'react'
import type { CursorState } from '../types'

export function useCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: -100,
    y: -100,
    isHovering: false,
    isClicking: false,
  })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursor((prev) => ({ ...prev, x: e.clientX, y: e.clientY }))
  }, [])

  const handleMouseDown = useCallback(() => {
    setCursor((prev) => ({ ...prev, isClicking: true }))
  }, [])

  const handleMouseUp = useCallback(() => {
    setCursor((prev) => ({ ...prev, isClicking: false }))
  }, [])

  const handleMouseEnterInteractive = useCallback(() => {
    setCursor((prev) => ({ ...prev, isHovering: true }))
  }, [])

  const handleMouseLeaveInteractive = useCallback(() => {
    setCursor((prev) => ({ ...prev, isHovering: false }))
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    const interactives = document.querySelectorAll('a, button, [data-cursor]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterInteractive)
      el.addEventListener('mouseleave', handleMouseLeaveInteractive)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive)
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive)
      })
    }
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseEnterInteractive, handleMouseLeaveInteractive])

  return cursor
}
