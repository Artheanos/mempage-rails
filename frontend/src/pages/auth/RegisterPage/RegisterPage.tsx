import { FC, useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Navigate } from 'react-router-dom'

import { localRoutes } from '@src/api/routesBuilder'
import { LoginForm, LoginInput } from '../LoginPage/LoginForm'
import { register } from '@src/api/queries/auth'
import { UserContext } from '@src/contexts/UserContext'


export const RegisterPage: FC = () => {
  const { user, login } = useContext(UserContext)
  const mutation = useMutation({
    mutationFn: register,
  })

  const onSubmit = (form: LoginInput) => {
    mutation.mutate(form, {
      onSuccess: (data) => {
        login({ ...data.user, token: data.token })
      },
    })
  }

  if (user) return <Navigate to={localRoutes.profile}/>

  return (
    <div className="LoginPage">
      <h2 style={{ marginBottom: '3rem' }}>Register</h2>
      <LoginForm onSubmit={onSubmit} isLoading={mutation.isLoading} error={mutation.error} action={'register'}/>
    </div>
  )
}
