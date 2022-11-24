import { Button } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { FC, useContext } from 'react'
import { PostContext } from './PostContext'

export const ControlPanel: FC = () => {
  const { deletePost } = useContext(PostContext)

  return (
    <Button onClick={() => deletePost()}>
      <Delete color='error'/>
    </Button>
  )
}
