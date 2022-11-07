import { ImagePost } from "../../interfaces/imagePosts";
import { apiRoutes } from "../routesBuilder";
import { jsonFetch } from "../../utils/api";

export const getImagePosts = (): ImagePost[] => {
  return jsonFetch(apiRoutes.imagePosts.root)
}
