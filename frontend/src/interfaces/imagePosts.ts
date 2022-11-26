import { Comment } from './comments'
import { ReactionValue } from './reactions'
import { User } from './auth'

export interface ImagePost {
  comment_count: number
  comments: Comment[]
  created_at: string
  current_user_reaction: ReactionValue
  dislikes: number
  header: string
  id: number
  image: string
  likes: number
  user: User
}
