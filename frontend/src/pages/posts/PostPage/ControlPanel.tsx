import { Button } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { FC, useContext } from 'react'
import { PostPageContext } from './PostPageContext'

export const ControlPanel: FC = () => {
  const { deletePost } = useContext(PostPageContext)

  return (
    <Button onClick={() => deletePost()}>
      <Delete color='error'/>
    </Button>
  )
}
