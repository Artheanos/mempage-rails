import { apiRoutes } from '../routesBuilder'
import { jsonFetch } from '../../utils/api'
import { ReactionMutationData } from '../../interfaces/reactions'

export const upsertReaction = (data: ReactionMutationData): Promise<void> => {
  return jsonFetch(apiRoutes.reactions.root, { data, method: 'POST' })
}

export const deleteReaction = (data: { image_post_id: number }): Promise<void> => {
  return jsonFetch(apiRoutes.reactions.root, { data, method: 'DELETE' })
}
