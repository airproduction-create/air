import { useState, useEffect } from 'react'
import type { Service } from '../types'
import { fetchServices } from '../lib/supabase'
import { services as localServices } from '../data/services'

/**
 * Services with a Supabase-first, local-fallback strategy — mirrors
 * usePortfolio. Renders bundled data from src/data/services.ts immediately,
 * then swaps in the live `services` table when reachable.
 */
export function useServices() {
  const [items, setItems] = useState<Service[]>(localServices)
  const [source, setSource] = useState<'supabase' | 'local'>('local')

  useEffect(() => {
    let mounted = true

    fetchServices()
      .then((remote) => {
        if (mounted && remote && remote.length > 0) {
          setItems(remote)
          setSource('supabase')
        }
      })
      .catch(() => {
        /* keep local fallback */
      })

    return () => {
      mounted = false
    }
  }, [])

  return { items, source }
}
