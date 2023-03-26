import { Box, LinearProgress } from '@mui/material'
import { FC, useContext, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'

import { createComment, deleteComment } from '@src/api/queries/comments'
import {
  deleteImagePost,
  getImagePost,
  ImagePostUpdateVariables,
  updateImagePost,
} from '@src/api/queries/imagePosts'
import { localRoutes } from '@src/api/routesBuilder'
import { PostItem } from '@src/components/posts/PostItem'
import { UserContext } from '@src/contexts/UserContext'
import { useScrollToTop } from '@src/utils/useScrollToTop'

import { CommentsContainer } from './CommentsContainer'
import { ControlPanel } from './ControlPanel'
import { PostPageContext, PostPageContextValue } from './PostPageContext'


export const PostPage: FC = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useContext(UserContext)
  const [isEditing, setIsEditing] = useState(false)

  const { isLoading, data: imagePost, refetch } = useQuery({
    queryKey: ['image_post', id],
    queryFn: () => getImagePost(id!),
  })

  const { mutate: deletePost } = useMutation({
    mutationFn: (): Promise<void> => deleteImagePost(id!),
    onSuccess: (): void => navigate(localRoutes.imagePosts.root),
  })

  const { mutate: updatePost } = useMutation({
    mutationFn: (data: ImagePostUpdateVariables): Promise<void> => updateImagePost(id!, data),
    onSuccess: (): void => {
      setIsEditing(false)
      void refetch()
    },
  })

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: (): void => void refetch(),
  })

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: (): void => void refetch(),
  })

  const isOwner = imagePost?.user && user && (imagePost.user.id === user.id)

  if (isLoading) return <LinearProgress/>

  const contextValue: PostPageContextValue = {
    imagePost: imagePost!,
    deletePost,
    updatePost,
    deleteComment: deleteCommentMutation.mutate,
    createComment: ({ content }) => createCommentMutation.mutateAsync({
      content,
      image_post_id: imagePost!.id,
    }),
    isCreatingComment: createCommentMutation.isLoading,
    isEditing,
    setIsEditing,
  }

  return (
    <Box sx={{ width: '100%', maxWidth: '36rem' }}>
      <PostPageContext.Provider value={contextValue}>
        {isOwner && <ControlPanel/>}
        <PostItem post={imagePost!}/>
        <CommentsContainer/>
      </PostPageContext.Provider>
    </Box>
  )
}
