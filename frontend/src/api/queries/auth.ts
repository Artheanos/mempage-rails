import { LoginInput } from '../../pages/auth/LoginPage/LoginForm'
import { LoginResponse } from '../../interfaces/auth'
import { apiRoutes } from '../routesBuilder'
import { jsonFetch } from '../../utils/api'

export const login = (data: LoginInput): Promise<LoginResponse> => {
  return jsonFetch(apiRoutes.auth.login, { method: 'POST', data })
}

export const register = (data: LoginInput): Promise<LoginResponse> => {
  return jsonFetch(apiRoutes.auth.register, { method: 'POST', data })
}

export const updateProfile = (data: any): Promise<unknown> => {
  return jsonFetch(apiRoutes.users.show(0), { method: 'PUT', data })
}

export const refreshToken = (): Promise<LoginResponse> => {
  return jsonFetch(apiRoutes.auth.tokens, { method: 'POST' })
}
