import { FC, useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Navigate } from 'react-router-dom'

import { UserContext } from '../../../contexts/UserContext'
import { localRoutes } from '../../../api/routesBuilder'
import { register } from '../../../api/mutations/auth'
import { LoginForm, LoginInput } from "../LoginPage/LoginForm";


export const RegisterPage: FC = () => {
  const { user, login } = useContext(UserContext)
  const mutation = useMutation({
    mutationFn: register,
  })

  const onSubmit = (form: LoginInput) => {
    mutation.mutate(form, {
      onSuccess: (data) => {
        login(data)
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
