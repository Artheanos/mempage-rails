import { Button } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { FC } from 'react'

interface Props {
  onDelete: () => void
}

export const ControlPanel: FC<Props> = ({ onDelete }) => {
  return (
    <Button onClick={() => onDelete()}>
      <Delete color='error'/>
    </Button>
  )
}
