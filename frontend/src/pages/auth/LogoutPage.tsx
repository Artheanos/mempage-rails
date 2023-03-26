import { useContext, useEffect } from 'react'
import { UserContext } from '@src/contexts/UserContext'
import { Navigate } from 'react-router-dom'
import { localRoutes } from '@src/api/routesBuilder'

export const LogoutPage = () => {
  const { user, logout } = useContext(UserContext)

  useEffect(() => {
    logout()
  }, [])

  return user ? <div>Logging out...</div> : <Navigate to={localRoutes.root}/>
}
