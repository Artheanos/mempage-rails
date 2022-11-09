export interface User {
  id: number
  email: string
}

export interface LoginResponse {
  token: string
  user_id: number
}
