import { LoginInput } from "../../pages/auth/LoginPage/LoginForm";
import { LoginResponse } from "../../interfaces/auth";
import { apiRoutes } from "../routesBuilder";
import { jsonFetch } from "../../utils/api";

export const login = (data: LoginInput): Promise<LoginResponse> => {
  return jsonFetch(apiRoutes.auth.login, { method: 'POST', data })
}
