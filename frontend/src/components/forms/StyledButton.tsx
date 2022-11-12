import { Button, ButtonProps } from '@mui/material'
import { FC } from 'react'

export const StyledButton: FC<ButtonProps> = ({ children, sx, variant = 'contained', ...props }) => {
  return (
    <Button
      sx={{
        borderRadius: '0.5rem',
        fontSize: '1rem',
        fontWeight: 'bold',
        padding: '0.5rem 1.2rem',
        ...sx,
      }}
      variant={variant}
      {...props}
    >
      {children}
    </Button>
  )
}
