import { FC, useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { LoginForm, LoginInput } from './LoginForm'
import { UserContext } from '@src/contexts/UserContext'
import { localRoutes } from '@src/api/routesBuilder'
import { login as loginMutation } from '@src/api/queries/auth'


export const LoginPage: FC = () => {
  const { login } = useContext(UserContext)
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: loginMutation,
  })

  const onSubmit = (form: LoginInput) => {
    mutation.mutate(form, {
      onSuccess: (data) => {
        login({ ...data.user, token: data.token })
        navigate(localRoutes.imagePosts.root)
      },
    })
  }

  return (
    <div className="LoginPage">
      <h2 style={{ marginBottom: '3rem' }}>Login</h2>
      <LoginForm onSubmit={onSubmit} isLoading={mutation.isLoading} error={mutation.error} action='login'/>
    </div>
  )
}
