import { Button, Paper, ToggleButton, useTheme } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import React, { FC, useContext } from 'react'
import { PostPageContext } from './PostPageContext'

export const ControlPanel: FC = () => {
  const { deletePost, isEditing, setIsEditing } = useContext(PostPageContext)

  return (
    <Paper color={useTheme().palette.info.light} elevation={5} sx={style}>
      <Button onClick={() => {
        if (confirm('Are you sure you want to delete this post?')) deletePost()
      }}>
        <Delete color="error"/>
      </Button>
      <ToggleButton
        sx={{
          border: 'none',
          '&:hover': { backgroundColor: useTheme().palette.primary.main + '14' },
        }}
        value=""
        selected={isEditing}
        onClick={() => setIsEditing(prev => !prev)}
      >
        <Edit color="info"/>
      </ToggleButton>
    </Paper>
  )
}

const style = {
  width: 'max-content',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '1rem',
  padding: '0.5rem 1rem',
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
}
