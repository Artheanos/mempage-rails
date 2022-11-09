import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button, ButtonProps, styled } from "@mui/material";
import { StyledButton } from "../../../components/forms/StyledButton";

interface Props {
  onSubmit: (input: LoginInput) => void
  isLoading: boolean
  error: any
}

export interface LoginInput {
  email: string
  password: string
}

export const LoginForm: FC<Props> = ({onSubmit, isLoading, error}) => {
  const { register, handleSubmit, formState: { isDirty }, reset } = useForm<LoginInput>()

  return (
    <div className="LoginForm">
      <form onSubmit={handleSubmit((data) => {
        reset(data)
        onSubmit(data)
      })}>
        <h2>Login</h2>
        <div>
          <label>Email</label>
          <input {...register('email')}/>
        </div>
        <div>
          <label>Password</label>
          <input {...register('password')} type="password"/>
        </div>
        <div>
          {!isDirty && error?.message}
        </div>
        <div>
          <StyledButton type="submit" disabled={isLoading} variant="contained">Login</StyledButton>
        </div>
      </form>
    </div>
  )
}

