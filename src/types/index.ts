export interface Revelation {
  id: string
  date: string
  headline: string
  narrative: string
  why: string
  subject: string
  year: number
  category: 'campaign' | 'personality' | 'movement' | 'artwork' | 'film' | 'innovation'
  tags: string[]
  created_at?: string
}

export interface QuizQuestion {
  id: number
  text: string
  subtext?: string
  options: QuizOption[]
}

export interface QuizOption {
  id: string
  label: string
  value: string
  archetype: string
}

export interface QuizResult {
  archetype: string
  headline: string
  description: string
  revelation: string
  trait: string
  color: string
}

export interface QuizResponse {
  id?: string
  session_id: string
  answers: Record<string, string>
  result_archetype: string
  share_token: string
  created_at?: string
}

export interface PortfolioItem {
  id: string
  title: string
  client: string
  category: string
  description: string
  narrative: string
  impact: string
  tags: string[]
  thumbnail: string
  year: number
  featured: boolean
}

export interface Service {
  id: string
  audience: string
  title: string
  description: string
  capabilities: string[]
  icon: string
}

export interface CursorState {
  x: number
  y: number
  isHovering: boolean
  isClicking: boolean
}
