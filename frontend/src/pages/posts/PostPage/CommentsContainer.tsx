import { FC } from 'react'
import { Box } from '@mui/material'

import { Comment } from '../../../interfaces/comments'
import { CommentItem } from './CommentItem'

interface Props {
  comments: Comment[]
}

export const CommentsContainer: FC<Props> = ({ comments }) => {
  return (
    <Box display='flex' flexDirection='column' gap='1rem'>
      <h2>Comments</h2>
      {comments.map(comment => <CommentItem key={comment.id} comment={comment}/>)}
    </Box>
  )
}
