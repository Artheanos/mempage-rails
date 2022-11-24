import { apiRoutes } from '../routesBuilder'
import { jsonFetch } from '../../utils/api'
import { CommentMutationData } from '../../interfaces/comments'

export const createComment = (data: CommentMutationData): Promise<void> => {
  return jsonFetch(apiRoutes.comments.root, { data, method: 'POST' })
}

export const deleteComment = (id: number) => {
  return jsonFetch(apiRoutes.comments.show(id), { method: 'DELETE' })
}
