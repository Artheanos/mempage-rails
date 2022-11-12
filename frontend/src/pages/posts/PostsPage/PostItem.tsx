import { FC } from 'react'

import { ImagePost } from '../../../interfaces/imagePosts'
import { apiHost } from '../../../api/routesBuilder'
import { Box } from '@mui/material'

interface Props {
  post: ImagePost
}

export const PostItem: FC<Props> = ({ post }) => {
  const src = `${apiHost}/${post.image}`

  return (
    <Box className="PostItem">
      <h2>{post.header}</h2>
      <p>{post.user.email}</p>
      <img style={{ width: '100%', borderRadius: '0 0 1rem 1rem' }} src={src} alt={post.header}/>
    </Box>
  )
}
