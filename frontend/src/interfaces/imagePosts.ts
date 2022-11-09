import { User } from "./auth";

export interface ImagePost {
  id: string
  header: string
  image: string
  comment_count: number
  created_at: string
  user: User
}
