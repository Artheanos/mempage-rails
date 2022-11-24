import { User } from './auth'
import { Comment } from './comments'

export interface ImagePost {
  id: number
  header: string
  image: string
  comment_count: number
  created_at: string
  user: User
  comments: Comment[]
}
