import { Alert, Box, TextField } from '@mui/material'
import * as React from 'react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { LoginInput } from '../LoginPage/LoginForm'
import { StyledButton } from '../../../components/forms/StyledButton'
import { User } from '../../../interfaces/auth'

interface FormInput extends LoginInput {
  confirmPassword: string
}

export const ProfileForm: FC<{ user: User }> = ({ user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    getValues,
  } = useForm<FormInput>({ defaultValues: { email: user.email } })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} onSubmit={handleSubmit(onSubmit)}>
      <TextField type="password" label="Password" {...register('password', { required: true })}/>
      {errors.password?.type && <Alert severity="error">{errors.password?.type}</Alert>}
      <TextField type="password" label="Confirm password" {...register('confirmPassword', {
        validate: (value) => value !== getValues('password') ? 'Passwords don\'t match' : undefined,
      })}/>
      {errors.confirmPassword?.type && <Alert severity="error">{errors.confirmPassword.message}</Alert>}
      <StyledButton type="submit" disabled={!isDirty}>
        Change password
      </StyledButton>
    </Box>
  )
}

