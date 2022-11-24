import { FC, useContext } from 'react'
import { Box } from '@mui/material'

import { CommentFormData } from '../../../interfaces/comments'
import { CommentItem } from './CommentItem'
import { CommentForm } from './CommentForm'
import { PostContext } from './PostContext'

export const CommentsContainer: FC = () => {
  const { imagePost: { comments } } = useContext(PostContext)

  return (
    <Box display='flex' flexDirection='column' gap='1rem'>
      <h2>Comments</h2>
      <CommentForm />
      {comments.map(comment => <CommentItem key={comment.id} comment={comment}/>)}
    </Box>
  )
}
