import { User } from "../../interfaces/auth";
import { apiRoutes } from "../routesBuilder";
import { jsonFetch } from "../../utils/api";

export const getUser = (userId: number): Promise<User> => {
  return jsonFetch(apiRoutes.users.show(userId))
}
