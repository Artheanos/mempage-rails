import { Box, LinearProgress } from '@mui/material'
import { FC, useContext } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'

import { createComment, deleteComment } from '../../../api/queries/comments'
import { deleteImagePost, getImagePost } from '../../../api/queries/imagePosts'
import { localRoutes } from '../../../api/routesBuilder'
import { PostItem } from '../../../components/posts/PostItem'
import { UserContext } from '../../../contexts/UserContext'
import { useScrollToTop } from '../../../utils/useScrollToTop'

import { CommentsContainer } from './CommentsContainer'
import { ControlPanel } from './ControlPanel'
import { PostPageContext, PostPageContextValue } from './PostPageContext'


export const PostPage: FC = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useContext(UserContext)

  const { isLoading, data: imagePost, refetch } = useQuery({
    queryKey: ['image_post', id],
    queryFn: () => getImagePost(id!),
  })

  const { mutate: deletePost } = useMutation({
    mutationFn: () => deleteImagePost(id!),
    onSuccess: () => {
      navigate(localRoutes.imagePosts.root)
    },
  })

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => refetch(),
  })

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => refetch(),
  })

  const isOwner = imagePost?.user && user && (imagePost.user.id === user.id)

  if (isLoading) return <LinearProgress/>

  const contextValue: PostPageContextValue = {
    imagePost: imagePost!,
    deletePost,
    deleteComment: deleteCommentMutation.mutate,
    createComment: ({ content }) => createCommentMutation.mutateAsync({
      content,
      image_post_id: imagePost!.id,
    }),
    isCreatingComment: createCommentMutation.isLoading,
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
