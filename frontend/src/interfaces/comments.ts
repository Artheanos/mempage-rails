import { User } from './auth'

export interface Comment {
  id: number
  content: string
  created_at: string
  updated_at: string
  user: User
}

export interface CommentFormData {
  content: string
}

export interface CommentMutationData {
  content: string
  image_post_id: number
}
