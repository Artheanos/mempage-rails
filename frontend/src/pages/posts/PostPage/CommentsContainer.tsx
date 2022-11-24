import { FC } from 'react'
import { Box, TextField } from '@mui/material'

import { Comment, CommentFormData } from '../../../interfaces/comments'
import { CommentItem } from './CommentItem'
import { CommentForm } from './CommentForm'
import { StyledButton } from '../../../components/forms/StyledButton'

interface Props {
  comments: Comment[]
  onSubmit: (form: CommentFormData) => void
  isLoading: boolean
}

export const CommentsContainer: FC<Props> = ({ comments, onSubmit, isLoading }) => {
  return (
    <Box display='flex' flexDirection='column' gap='1rem'>
      <h2>Comments</h2>
      <CommentForm onSubmit={onSubmit} isLoading={isLoading}/>
      {comments.map(comment => <CommentItem key={comment.id} comment={comment}/>)}
    </Box>
  )
}
