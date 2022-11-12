import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

interface Props {
  path: string
  title: string
  icon: JSX.Element
  onClose: () => void
}

export const SidebarEntry: FC<Props> = ({
  path,
  title,
  icon,
  onClose,
}) => {
  const active = useLocation().pathname.startsWith(path)

  return (
    <Link to={path} className="disable-blue" onClick={onClose}>
      <ListItemButton selected={active} sx={{ paddingX: '1.5rem' }}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={title}/>
      </ListItemButton>
    </Link>
  )
}
