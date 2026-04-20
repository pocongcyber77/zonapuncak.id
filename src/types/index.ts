export type Role = 'user' | 'admin'

export type BookingStatus = 'pending' | 'approved' | 'rejected'

export type Difficulty = 'easy' | 'moderate' | 'hard' | 'extreme'

export interface Profile {
  id: string
  username: string
  avatar_url: string | null
  role: Role
}

export interface Mountain {
  id: string
  name: string
  location: string
  elevation: number
  difficulty: Difficulty
}

export interface Trip {
  id: string
  mountain_id: string
  title: string
  description: string
  price: number
  quota: number
  start_date: string
  end_date: string
  difficulty: Difficulty
  mountain?: Mountain
}

/* ── Jadwal / Kalender ─────────────────────────────── */
export type AgendaType = 'briefing' | 'departure' | 'summit' | 'descent' | 'finish' | 'info'

export interface AgendaItem {
  id: string
  date: string           // YYYY-MM-DD
  time?: string          // HH:mm (opsional)
  type: AgendaType
  title: string
  body?: string
}

export interface TripBatch {
  id: string
  label: string          // misal "Batch Mei 2026"
  start_date: string     // YYYY-MM-DD
  end_date: string
  quota: number
  filled: number
  price: number
  status: 'open' | 'almost_full' | 'full' | 'closed'
  agendas: AgendaItem[]
}

export interface TripPage {
  slug: string
  name: string           // "Gunung Raung"
  location: string
  elevation: number
  difficulty: Difficulty
  duration_days: number
  cover: string          // path public
  price_from: number
  quota_total: number
  meeting_point: string
  include: string[]
  exclude: string[]
  requirements: string[]
  batches: TripBatch[]
}

export interface Booking {
  id: string
  user_id: string
  trip_id: string
  status: BookingStatus
  created_at: string
  trip?: Trip
}

export interface Post {
  id: string
  user_id: string
  content: string
  created_at: string
  profile?: Profile
  media?: Media[]
  _count?: {
    likes: number
    comments: number
  }
}

export interface Media {
  id: string
  post_id: string
  url: string
  type: 'image'
  order_index: number
}

export interface Comment {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
  profile?: Profile
}

export interface Like {
  id: string
  user_id: string
  post_id: string
}
