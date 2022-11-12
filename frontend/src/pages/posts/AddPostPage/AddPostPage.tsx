import { Box } from '@mui/material'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { PostForm, PostInput } from './PostForm'
import { apiRoutes, localRoutes } from '../../../api/routesBuilder'
import { jsonFetch } from '../../../utils/api'

export const AddPostPage: FC = () => {
  const navigate = useNavigate()

  const onSubmit = async(form: PostInput) => {
    const data = new FormData()
    data.append('image_post[header]', form.header)
    data.append('image_post[image]', form.file.item(0)!)
    await jsonFetch(apiRoutes.imagePosts.root, { data, method: 'POST' })

    navigate(localRoutes.imagePosts.root)
  }

  return (
    <Box>
      <PostForm onSubmit={onSubmit}/>
    </Box>
  )
}
