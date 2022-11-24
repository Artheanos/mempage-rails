import { FC } from 'react'
import { Comment } from '../../../interfaces/comments'
import { Card, Typography } from '@mui/material'
import { formatDate } from '../../../utils/dates'
import { Link } from 'react-router-dom'
import { localRoutes } from '../../../api/routesBuilder'

interface Props {
  comment: Comment
}

export const CommentItem: FC<Props> = ({ comment }) => {
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
      <Typography textAlign='left'>
        {comment.content}
      </Typography>
    </Card>
  )
}
