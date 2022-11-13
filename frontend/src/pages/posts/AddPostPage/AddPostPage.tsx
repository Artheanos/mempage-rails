import { Box } from '@mui/material'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PostForm, PostInput } from './PostForm'
import { apiRoutes, localRoutes } from '../../../api/routesBuilder'
import { jsonFetch } from '../../../utils/api'

export const AddPostPage: FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async(form: PostInput) => {
    const data = new FormData()
    data.append('image_post[header]', form.header)
    data.append('image_post[image]', form.file.item(0)!)
    setIsLoading(true)
    await jsonFetch(apiRoutes.imagePosts.root, { data, method: 'POST' })
    setIsLoading(false)

    navigate(localRoutes.imagePosts.root)
  }

  return (
    <Box>
      <PostForm onSubmit={onSubmit} isLoading={isLoading}/>
    </Box>
  )
}
