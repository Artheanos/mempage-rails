import { FC } from 'react'

import { ImagePost } from '../../../interfaces/imagePosts'
import { apiHost, localRoutes } from '../../../api/routesBuilder'
import { Card, CardContent, CardMedia } from '@mui/material'
import { Link } from "react-router-dom";

interface Props {
  post: ImagePost
}

export const PostItem: FC<Props> = ({ post }) => {
  const src = `${apiHost}/${post.image}`

  return (
    <Card>
      <CardContent sx={{ padding: '0.1rem', width: '100%' }}>
        <Link className="disable-blue" to={localRoutes.imagePosts.show(post.id)}>
          <h2>{post.header}</h2>
        </Link>
        <Link className="disable-blue" to={localRoutes.users.show(post.user.id)}>
          <p>{post.user.email}</p>
        </Link>
      </CardContent>
      <Link className="disable-blue" to={localRoutes.imagePosts.show(post.id)}>
        <CardMedia
          component="img"
          image={src}
        />
      </Link>
    </Card>
  )
}
