export type ReactionValue = 'like' | 'dislike'

export interface ReactionMutationData {
  reaction: ReactionValue
  image_post_id: number
}
