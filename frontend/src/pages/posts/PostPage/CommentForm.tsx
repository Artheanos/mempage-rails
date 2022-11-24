import { Box } from '@mui/material'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { StyledButton } from '../../../components/forms/StyledButton'
import { StyledInput } from '../../../components/forms/StyledInput'

interface Props {
  isLoading: boolean
  onSubmit: (form: { content: string }) => void
}

export const CommentForm: FC<Props> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<{ content: string }>({ defaultValues: { content: '' } })

  return (
    <Box component="form" sx={containerStyle} onSubmit={handleSubmit(onSubmit)}>
      <StyledInput
        error={errors.content}
        label="New comment"
        multiline
        {...register('content', { required: true })}
      />
      <StyledButton isLoading={isLoading} disabled={!isDirty} type="submit">
        Submit
      </StyledButton>
    </Box>
  )
}

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingX: '5rem',
  marginBottom: '2rem',
}
