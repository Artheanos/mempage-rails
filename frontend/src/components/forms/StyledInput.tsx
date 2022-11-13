import { FC, forwardRef } from 'react'
import { Alert, StandardTextFieldProps, TextField } from "@mui/material";

interface Props extends StandardTextFieldProps {
  error?: any
}

export const StyledInput: FC<Props> = forwardRef(({ error, ...fieldProps }, ref) => {
  return (
    <>
      <TextField {...fieldProps} ref={ref}/>
      {error && <Alert severity='error'>{error.message}</Alert>}
    </>
  )
})
