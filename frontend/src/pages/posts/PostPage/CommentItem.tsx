import { FC, useContext } from 'react'
import { Comment } from '../../../interfaces/comments'
import { Box, Button, Card, Typography } from '@mui/material'
import { formatDate } from '../../../utils/dates'
import { Link } from 'react-router-dom'
import { localRoutes } from '../../../api/routesBuilder'
import { UserContext } from '../../../contexts/UserContext'
import { Delete } from '@mui/icons-material'
import { PostContext } from './PostContext'

interface Props {
  comment: Comment
}

export const CommentItem: FC<Props> = ({ comment }) => {
  const { deleteComment } = useContext(PostContext)
  const { user } = useContext(UserContext)
  const isOwner = user?.id === comment.user.id

  return (
    <Card sx={{ padding: '1.2rem 2rem' }}>
      <Typography fontSize="md" sx={{ mb: 0.5, display: 'flex', justifyContent: 'space-between' }}>
        <div>
          {formatDate(comment.created_at)}
        </div>
        <div>
          <Link className="disable-blue" to={localRoutes.users.show(comment.user.id)}>
            {comment.user.email}
          </Link>
        </div>
      </Typography>
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
