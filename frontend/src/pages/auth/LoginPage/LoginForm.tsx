import { Box, Grid } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { localRoutes } from '../../../api/routesBuilder'
import { merge, serverToFormErrors } from '../../../utils/api'
import { StyledButton } from '../../../components/forms/StyledButton'
import { StyledInput } from '../../../components/forms/StyledInput'


interface Props {
  onSubmit: (input: LoginInput) => void
  isLoading: boolean
  error: any
  action: 'login' | 'register'
}

export interface LoginInput {
  email: string
  password: string
}

export const LoginForm: FC<Props> = ({ onSubmit, isLoading, error, action }) => {
  const { register, handleSubmit, formState: { isDirty, errors: formErrors }, reset } = useForm<LoginInput>()
  const antiAction = action === 'login' ? 'register' : 'login'
  const serverErrors = serverToFormErrors(error?.response?.data?.errors)
  const errors = merge(formErrors, serverErrors)

  return (
    <div className="LoginForm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction='column' sx={{ minWidth: '20rem' }}>
          <Grid item>
            <StyledInput
              sx={{ width: '100%' }}
              label='Email'
              error={errors.email}
              {...register('email')}
            />
          </Grid>
          <Grid item>
            <StyledInput
              sx={{ width: '100%' }}
              label='Password'
              type="password"
              error={errors.password}
              {...register('password')}
            />
          </Grid>
          <Grid item>
            {!isDirty && error?.message}
          </Grid>
          <Grid item sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <StyledButton type="submit" isLoading={isLoading} variant="contained">{messages[action]}</StyledButton>
            <Link to={localRoutes[antiAction]}>
              {messages[antiAction]} instead
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

const messages = {
  login: 'Login',
  register: 'Register',
}
