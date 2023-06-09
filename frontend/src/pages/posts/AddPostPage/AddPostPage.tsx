import { Box } from '@mui/material'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PostForm, PostInput } from './PostForm'
import { apiRoutes, localRoutes } from '@src/api/routesBuilder'
import { jsonFetch } from '@src/utils/api'

export const AddPostPage: FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async(form: PostInput) => {
    const data = new FormData()
    data.append('header', form.header)
    data.append('image_file', form.file.item(0)!)
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
