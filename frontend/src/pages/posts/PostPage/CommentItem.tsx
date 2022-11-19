import { FC } from 'react'
import { Comment } from "../../../interfaces/comments";
import { Card, Typography } from "@mui/material";
import { formatDate } from "../../../utils/dates";

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
          {comment.user.email}
        </div>
      </Typography>
      <hr/>
      <Typography textAlign='left'>
        {comment.content}
      </Typography>
    </Card>
  )
}
