import { createClient } from '@supabase/supabase-js'
import type { Revelation, QuizResponse, PortfolioItem, Service } from '../types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// ── Portfolio / Work ─────────────────────────────────────────────────────────

// DB row shape (snake_case) for the portfolio_items table.
interface PortfolioRow {
  slug: string
  title: string
  client: string
  category: string
  description: string | null
  narrative: string | null
  impact: string | null
  tags: string[] | null
  thumbnail: string | null
  vimeo_id: string | null
  year: number
  featured: boolean | null
}

function mapPortfolioRow(row: PortfolioRow): PortfolioItem {
  return {
    id: row.slug,
    title: row.title,
    client: row.client,
    category: row.category,
    description: row.description ?? '',
    narrative: row.narrative ?? '',
    impact: row.impact ?? '',
    tags: row.tags ?? [],
    thumbnail: row.thumbnail ?? '',
    vimeoId: row.vimeo_id ?? undefined,
    year: row.year,
    featured: row.featured ?? false,
  }
}

/**
 * Fetch published portfolio items from Supabase, ordered by sort_order.
 * Returns null when Supabase isn't configured or the query fails, so callers
 * can fall back to the local data file in src/data/portfolio.ts.
 */
export async function fetchPortfolioItems(): Promise<PortfolioItem[] | null> {
  if (!supabase) return null

  const { data, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })

  if (error || !data || data.length === 0) return null
  return (data as PortfolioRow[]).map(mapPortfolioRow)
}

// ── Services / Who We Work With ──────────────────────────────────────────────

interface ServiceRow {
  slug: string
  audience: string
  title: string
  description: string | null
  capabilities: string[] | null
  icon: string | null
}

function mapServiceRow(row: ServiceRow): Service {
  return {
    id: row.slug,
    audience: row.audience,
    title: row.title,
    description: row.description ?? '',
    capabilities: row.capabilities ?? [],
    icon: row.icon ?? 'film',
  }
}

/**
 * Fetch published services from Supabase, ordered by sort_order.
 * Returns null when Supabase isn't configured or the query fails, so callers
 * can fall back to the local data file in src/data/services.ts.
 */
export async function fetchServices(): Promise<Service[] | null> {
  if (!supabase) return null

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })

  if (error || !data || data.length === 0) return null
  return (data as ServiceRow[]).map(mapServiceRow)
}

// ── Daily Revelation ────────────────────────────────────────────────────────

function getLocalDateString(): string {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export async function fetchTodaysRevelation(): Promise<Revelation | null> {
  if (!supabase) return null

  const today = getLocalDateString()

  const { data, error } = await supabase
    .from('daily_revelations')
    .select('*')
    .eq('date', today)
    .single()

  if (error || !data) {
    // Fallback: get the most recent entry
    const { data: fallback } = await supabase
      .from('daily_revelations')
      .select('*')
      .order('date', { ascending: false })
      .limit(1)
      .single()
    return fallback
  }

  return data
}

export function subscribeToRevelation(
  onUpdate: (revelation: Revelation) => void
) {
  if (!supabase) return null

  const today = getLocalDateString()

  const subscription = supabase
    .channel('daily_revelations')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'daily_revelations',
        filter: `date=eq.${today}`,
      },
      (payload) => {
        if (payload.new) {
          onUpdate(payload.new as Revelation)
        }
      }
    )
    .subscribe()

  return subscription
}

// ── Quiz Responses ──────────────────────────────────────────────────────────

export async function saveQuizResponse(
  response: Omit<QuizResponse, 'id' | 'created_at'>
): Promise<string | null> {
  if (!supabase) {
    // Return a fake token for demo mode
    return response.share_token
  }

  const { data, error } = await supabase
    .from('quiz_responses')
    .insert(response)
    .select('share_token')
    .single()

  if (error) {
    console.error('Error saving quiz response:', error)
    return response.share_token // Return local token as fallback
  }

  return data?.share_token || null
}

export async function fetchQuizResult(
  shareToken: string
): Promise<QuizResponse | null> {
  if (!supabase) return null

  const { data, error } = await supabase
    .from('quiz_responses')
    .select('*')
    .eq('share_token', shareToken)
    .single()

  if (error) return null
  return data
}
