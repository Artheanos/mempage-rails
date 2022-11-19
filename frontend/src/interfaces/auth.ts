export interface User {
  id: number
  email: string
  created_at: string
  post_count: number
  comment_count: number
}

export interface LoginResponse {
  token: string
  user: User
}
