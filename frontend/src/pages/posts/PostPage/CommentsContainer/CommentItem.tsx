import { Box, Button, Card, Typography } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { FC, useContext } from 'react'
import { Link } from 'react-router-dom'

import { Comment } from '../../../../interfaces/comments'
import { formatDate } from '../../../../utils/dates'
import { localRoutes } from '../../../../api/routesBuilder'
import { PostPageContext } from '../PostPageContext'
import { UserContext } from '../../../../contexts/UserContext'

interface Props {
  comment: Comment
}

export const CommentItem: FC<Props> = ({ comment }) => {
  const { deleteComment } = useContext(PostPageContext)
  const { user } = useContext(UserContext)
  const isOwner = user?.id === comment.user.id

  return (
    <Card sx={{ padding: '1.2rem 2rem' }}>
      <Box sx={{ mb: 0.5, display: 'flex', justifyContent: 'space-between', fontSize: 'md' }}>
        <div>
          {formatDate(comment.created_at)}
        </div>
        <div>
          <Link className="disable-blue" to={localRoutes.users.show(comment.user.id)}>
            {comment.user.email}
          </Link>
        </div>
      </Box>
      <hr/>
      <Box>
        <Typography textAlign='left'>
          {comment.content}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          {isOwner && (
            <Button color='error' onClick={() => deleteComment(comment.id)}>
              <Delete/>
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  )
}
