import { createContext } from 'react'

import { ImagePost } from '../../../interfaces/imagePosts'
import { ReactionValue } from '../../../interfaces/reactions'

interface PostItemContextValue {
  handleReaction: (reaction: ReactionValue) => void
  post: ImagePost
  currentReaction: ReactionValue | null
}

export const PostItemContext = createContext<PostItemContextValue>({} as unknown as PostItemContextValue)
