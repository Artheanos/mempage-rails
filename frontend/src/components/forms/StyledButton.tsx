import { Button, ButtonProps, CircularProgress, useTheme } from '@mui/material'
import { createRef, CSSProperties, FC } from 'react'

interface Props extends ButtonProps {
  isLoading?: boolean
}

export const StyledButton: FC<Props> = ({
  isLoading,
  children,
  sx,
  variant = 'contained',
  disabled,
  ...props
}) => {
  const buttonRef = createRef<HTMLButtonElement>()

  const childrenSx: CSSProperties = isLoading ? { visibility: 'hidden' } : {}

  return (
    <Button
      sx={{
        borderRadius: '0.5rem',
        fontSize: '1rem',
        fontWeight: 'bold',
        padding: '0.5rem 1.2rem',
        ...sx
      }}
      variant={variant}
      disabled={disabled || isLoading}
      {...props}
      ref={buttonRef}
    >
      {isLoading && <CircularProgress size={25} sx={{ position: 'absolute' }}/>}
      <div style={childrenSx}>{children}</div>
    </Button>
  )
}
