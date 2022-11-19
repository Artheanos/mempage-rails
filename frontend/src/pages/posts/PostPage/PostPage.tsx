import { Box, LinearProgress } from '@mui/material'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { CommentsContainer } from './CommentsContainer'
import { getImagePost } from '../../../api/queries/imagePosts'
import { PostItem } from '../PostsPage/PostItem'

export const PostPage: FC = () => {
  const { id } = useParams()
  const { isLoading, data } = useQuery({
    queryKey: ['image_post'],
    queryFn: () => getImagePost(id || ''),
  })

  if (isLoading) return <LinearProgress/>

  return (
    <Box sx={{ width: '100%', maxWidth: '36rem' }}>
      <PostItem post={data!}/>
      <CommentsContainer comments={data?.comments || []}/>
    </Box>
  )
}
