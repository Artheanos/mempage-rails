import { FC } from 'react'

import { ImagePost } from '../../../interfaces/imagePosts'
import { apiHost } from '../../../api/routesBuilder'
import { Card, CardContent, CardMedia } from '@mui/material'

interface Props {
  post: ImagePost
}

export const PostItem: FC<Props> = ({ post }) => {
  const src = `${apiHost}/${post.image}`

  return (
    <Card>
      <CardContent sx={{ padding: '0.1rem' }}>
        <h2>{post.header}</h2>
        <p>{post.user.email}</p>
      </CardContent>
      <CardMedia
        component="img"
        image={src}
      />
    </Card>
  )
}
