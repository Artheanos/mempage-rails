import { createContext } from 'react'

import { ImagePost } from '@src/interfaces/imagePosts'
import { ReactionValue } from '@src/interfaces/reactions'

interface PostItemContextValue {
  handleReaction: (reaction: ReactionValue) => void
  post: ImagePost
  currentReaction: ReactionValue | null
}

export const PostItemContext = createContext<PostItemContextValue>({} as unknown as PostItemContextValue)
