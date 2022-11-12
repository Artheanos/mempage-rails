import { FC, useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { LoginForm, LoginInput } from './LoginForm'
import { UserContext } from '../../../contexts/UserContext'
import { localRoutes } from '../../../api/routesBuilder'
import { login as loginMutation } from '../../../api/mutations/auth'


export const LoginPage: FC = () => {
  const { login } = useContext(UserContext)
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: loginMutation,
  })

  const onSubmit = (arg: LoginInput) => {
    mutation.mutate(arg, {
      onSuccess: (data) => {
        login(data)
        navigate(localRoutes.imagePosts.root)
      },
    })
  }

  return (
    <div className="LoginPage">
      <LoginForm onSubmit={onSubmit} isLoading={mutation.isLoading} error={mutation.error}/>
    </div>
  )
}
