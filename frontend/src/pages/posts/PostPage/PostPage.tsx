import { Box, LinearProgress } from '@mui/material'
import { FC, useContext } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'

import { CommentsContainer } from './CommentsContainer'
import { deleteImagePost, getImagePost } from '../../../api/queries/imagePosts'
import { PostItem } from '../PostsPage/PostItem'
import { localRoutes } from '../../../api/routesBuilder'
import { UserContext } from '../../../contexts/UserContext'
import { ControlPanel } from './ControlPanel'
import { createComment, deleteComment } from '../../../api/queries/comments'
import { PostContext } from './PostContext'

export const PostPage: FC = () => {
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

  return (
    <Box sx={{ width: '100%', maxWidth: '36rem' }}>
      <PostContext.Provider value={{
        imagePost: imagePost!,
        deletePost,
        deleteComment: deleteCommentMutation.mutate,
        createComment: ({ content }) => createCommentMutation.mutate({
          content,
          image_post_id: imagePost!.id,
        }),
        isCreatingComment: createCommentMutation.isLoading,
      }}>
        {isOwner && <ControlPanel/>}
        <PostItem post={imagePost!}/>
        <CommentsContainer/>
      </PostContext.Provider>
    </Box>
  )
}
