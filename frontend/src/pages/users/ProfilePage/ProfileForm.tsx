import { Alert, Box, TextField } from '@mui/material'
import * as React from 'react'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { LoginInput } from '../../auth/LoginPage/LoginForm'
import { StyledButton } from '../../../components/forms/StyledButton'
import { User } from '../../../interfaces/auth'

interface FormInput extends LoginInput {
  confirmPassword: string
}

interface Props {
  user: User
  onSubmit: (form: FormInput) => Promise<void>
  resetCounter: number
  isLoading: boolean
}

export const ProfileForm: FC<Props> = ({ user, onSubmit, resetCounter, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    getValues,
  } = useForm<FormInput>({ defaultValues: { email: user.email, password: '', confirmPassword: '' } })

  useEffect(reset, [resetCounter])

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
      onSubmit={handleSubmit(onSubmit)}>
      <TextField type="password" label="Password" {...register('password', { required: true, minLength: 2 })}/>
      {errors.password?.type && <Alert severity="error">{errors.password?.type}</Alert>}

      <TextField type="password" label="Confirm password" {...register('confirmPassword', {
        validate: (value) => value !== getValues('password') ? 'Passwords don\'t match' : undefined,
      })}/>
      {errors.confirmPassword?.type && <Alert severity="error">{errors.confirmPassword.message}</Alert>}
      <StyledButton type="submit" isLoading={isLoading} disabled={!isDirty}>
        Change password
      </StyledButton>
    </Box>
  )
}

