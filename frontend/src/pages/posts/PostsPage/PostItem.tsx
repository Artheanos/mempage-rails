import { FC } from 'react'

import { ImagePost } from '../../../interfaces/imagePosts'
import { apiHost } from '../../../api/routesBuilder'
import { Card, CardMedia, SxProps } from '@mui/material'

interface Props {
  post: ImagePost
}

export const PostItem: FC<Props> = ({ post }) => {
  const src = `${apiHost}/${post.image}`

  return (
    <Card sx={containerStyle}>
      <h2>{post.header}</h2>
      <p>{post.user.email}</p>
      <CardMedia
        component="img"
        image={src}
      />
    </Card>
  )
}

const containerStyle: SxProps = {
  // paddingBottom: 0
  // boxShadow: '0px 5px 10px grey',
  // borderRadius: '1rem'
}
