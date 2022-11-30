import { apiRoutes } from '../routesBuilder'
import { ImagePost } from '../../interfaces/imagePosts'
import { jsonFetch } from '../../utils/api'
import { PaginatedResponse } from '../types'

export const getImagePosts = (page = 1): Promise<PaginatedResponse<ImagePost>> => {
  return jsonFetch(apiRoutes.imagePosts.root, { params: { page } })
}

export const getImagePost = (id: string): Promise<ImagePost> => {
  return jsonFetch(apiRoutes.imagePosts.show(id))
}

export const deleteImagePost = (id: string): Promise<void> => {
  return jsonFetch(apiRoutes.imagePosts.show(id), { method: 'DELETE' })
}
