import { FC } from 'react'
import { Drawer, List } from '@mui/material'

import { useSidebarConfig } from './useSidebarConfig'

interface Props {
  open: boolean
  onClose: () => void
}

export const Sidebar: FC<Props> = ({ open, onClose }) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
    >
      <List sx={listStyle}>
        {useSidebarConfig(onClose)}
      </List>
    </Drawer>
  )
}

const listStyle = {
  paddingTop: '2rem',
  minWidth: '12rem',
}
