import { Box } from '@mui/material'
import { FC, useContext } from 'react'

import { CommentItem } from './CommentItem'
import { CommentForm } from './CommentForm'
import { PostPageContext } from '../PostPageContext'

export const CommentsContainer: FC = () => {
  const { imagePost: { comments } } = useContext(PostPageContext)

  return (
    <Box display='flex' flexDirection='column' gap='1rem'>
      <h2>Comments</h2>
      <CommentForm />
      {comments.map(comment => <CommentItem key={comment.id} comment={comment}/>)}
    </Box>
  )
}
