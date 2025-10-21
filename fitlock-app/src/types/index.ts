export interface User {
  id: string
  name: string
  email: string
  gbp_balance: number
  profile_picture?: string
  created_at?: string
  updated_at?: string
}

export interface Pledge {
  id: string
  creator_id: string
  goal: string
  deadline: string
  stake: number
  status: 'open' | 'closed' | 'completed' | 'failed'
  image_url?: string
  proof_url?: string
  created_at?: string
  updated_at?: string
  bets?: Bet[]
  verification_votes?: VerificationVote[]
  creator?: User
}

export interface Bet {
  id?: string
  user_id: string
  pledge_id: string
  side: 'yes' | 'no'
  amount: number
  created_at?: string
  user?: User
}

export interface VerificationVote {
  id?: string
  user_id: string
  pledge_id: string
  vote: 'yes' | 'no'
  created_at?: string
  user?: User
}
