import { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { Navigate } from 'react-router-dom'
import { localRoutes } from '../../api/routesBuilder'

export const LogoutPage = () => {
  const { user, logout } = useContext(UserContext)

  useEffect(() => {
    logout()
  }, [])

  return user ? <div>Logging out...</div> : <Navigate to={localRoutes.root}/>
}
