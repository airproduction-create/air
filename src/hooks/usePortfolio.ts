import { useState, useEffect } from 'react'
import type { PortfolioItem } from '../types'
import { fetchPortfolioItems } from '../lib/supabase'
import { portfolioItems as localPortfolio } from '../data/portfolio'

/**
 * Portfolio items with a Supabase-first, local-fallback strategy.
 *
 * Renders immediately with the bundled data in src/data/portfolio.ts (no
 * loading flash), then replaces it with the live Supabase table when the
 * `portfolio_items` query succeeds. If Supabase isn't configured or the
 * table is empty/unreachable, the local data simply stays.
 */
export function usePortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>(localPortfolio)
  const [source, setSource] = useState<'supabase' | 'local'>('local')

  useEffect(() => {
    let mounted = true

    fetchPortfolioItems()
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
