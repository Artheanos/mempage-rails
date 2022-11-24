import { createContext } from 'react'
import { ImagePost } from '../../../interfaces/imagePosts'
import { CommentFormData } from '../../../interfaces/comments'

interface PostContextValue {
  createComment: (form: CommentFormData) => void
  deleteComment: (id: number) => void
  deletePost: () => void
  imagePost: ImagePost
  isCreatingComment: boolean
}

export const PostContext = createContext<PostContextValue>({} as unknown as PostContextValue)
