import { useState, useEffect } from 'react'
import type { Revelation } from '../types'
import { fetchTodaysRevelation, subscribeToRevelation } from '../lib/supabase'
import { getTodaysRevelation } from '../data/revelations'

export function useDailyRevelation() {
  const [revelation, setRevelation] = useState<Revelation | null>(null)
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState<'supabase' | 'local'>('local')

  useEffect(() => {
    let mounted = true

    async function load() {
      setLoading(true)
      try {
        const data = await fetchTodaysRevelation()
        if (mounted) {
          if (data) {
            setRevelation(data)
            setSource('supabase')
          } else {
            // Fallback to local placeholder data
            setRevelation(getTodaysRevelation())
            setSource('local')
          }
        }
      } catch {
        if (mounted) {
          setRevelation(getTodaysRevelation())
          setSource('local')
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()

    // Subscribe to real-time updates
    const subscription = subscribeToRevelation((updated) => {
      if (mounted) {
        setRevelation(updated)
        setSource('supabase')
      }
    })

    // Refresh at midnight
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    const msUntilMidnight = tomorrow.getTime() - now.getTime()

    const midnightTimer = setTimeout(() => {
      load()
    }, msUntilMidnight)

    return () => {
      mounted = false
      subscription?.unsubscribe()
      clearTimeout(midnightTimer)
    }
  }, [])

  return { revelation, loading, source }
}
