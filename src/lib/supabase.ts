import { createClient } from '@supabase/supabase-js'
import type { Revelation, QuizResponse } from '../types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

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
