import { User } from './auth'

export interface Comment {
  id: string
  content: string
  created_at: string
  updated_at: string
  user: User
}
