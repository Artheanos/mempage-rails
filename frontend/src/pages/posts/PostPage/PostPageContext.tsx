import { createContext, Dispatch, SetStateAction } from 'react'

import { CommentFormData } from '@src/interfaces/comments'
import { ImagePost } from '@src/interfaces/imagePosts'
import { ImagePostUpdateVariables } from '@src/api/queries/imagePosts'

export interface PostPageContextValue {
  createComment: (form: CommentFormData) => Promise<void>
  deleteComment: (id: number) => void
  deletePost: () => void
  updatePost: (data: ImagePostUpdateVariables) => void
  imagePost: ImagePost
  isCreatingComment: boolean
  isEditing: boolean
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

export const PostPageContext = createContext<PostPageContextValue>({} as unknown as PostPageContextValue)
