import { ImagePost } from '../../interfaces/imagePosts'
import { apiRoutes } from '../routesBuilder'
import { jsonFetch } from '../../utils/api'

export const getImagePosts = (): Promise<ImagePost[]> => {
  return jsonFetch(apiRoutes.imagePosts.root)
}

export const getImagePost = (id: string): Promise<ImagePost> => {
  return jsonFetch(apiRoutes.imagePosts.show(id))
}
