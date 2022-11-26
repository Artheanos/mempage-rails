import { createContext } from 'react'

import { CommentFormData } from '../../../interfaces/comments'
import { ImagePost } from '../../../interfaces/imagePosts'

export interface PostPageContextValue {
  createComment: (form: CommentFormData) => Promise<void>
  deleteComment: (id: number) => void
  deletePost: () => void
  imagePost: ImagePost
  isCreatingComment: boolean
}

export const PostPageContext = createContext<PostPageContextValue>({} as unknown as PostPageContextValue)
