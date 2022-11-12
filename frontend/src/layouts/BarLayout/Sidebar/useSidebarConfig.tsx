import { useContext } from 'react'
import { UserContext } from '../../../contexts/UserContext'
import { localRoutes } from '../../../api/routesBuilder'
import { UploadFile, VerifiedUser } from '@mui/icons-material'
import { SidebarEntry } from './SidebarEntry'

interface EntryConfig {
  path: string
  title: string
  icon: JSX.Element
  visible?: boolean
}

export const useSidebarConfig = (onClose: () => void) => {
  const { user } = useContext(UserContext)

  const config: EntryConfig[] = [
    {
      path: localRoutes.imagePosts.add,
      title: 'Upload',
      icon: <UploadFile/>,
      visible: Boolean(user),
    },
    {
      path: localRoutes.logout,
      title: 'Logout',
      icon: <VerifiedUser/>,
      visible: Boolean(user),
    },
    {
      path: localRoutes.login,
      title: 'Login',
      icon: <VerifiedUser/>,
      visible: !Boolean(user),
    },
  ]

  return config.filter(i => !i.hasOwnProperty('visible') || i.visible === true).map((entry, key) => (
    <SidebarEntry key={key} onClose={onClose} {...entry}/>
  ))
}
