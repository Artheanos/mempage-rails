import { Box, Typography } from '@mui/material'
import { FC, useContext } from 'react'

import { CommentForm } from './CommentForm'
import { CommentItem } from './CommentItem'
import { PostPageContext } from '../PostPageContext'
import { UserContext } from '@src/contexts/UserContext'
import { localRoutes } from '@src/api/routesBuilder'
import { Link } from 'react-router-dom'

export const CommentsContainer: FC = () => {
  const { imagePost: { comments } } = useContext(PostPageContext)
  const { user } = useContext(UserContext)

  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <h2>Comments</h2>
      {user ? (
        <CommentForm/>
      ) : (
        <Typography color="text.secondary">
          <Link to={localRoutes.login}>Log in</Link> to post a comment
        </Typography>
      )}
      {comments.map(comment => <CommentItem key={comment.id} comment={comment}/>)}
    </Box>
  )
}
