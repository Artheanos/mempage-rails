import { Box } from '@mui/material'
import { FC, useContext } from 'react'
import { useForm } from 'react-hook-form'

import { StyledButton } from '../../../components/forms/StyledButton'
import { StyledInput } from '../../../components/forms/StyledInput'
import { PostContext } from './PostContext'

export const CommentForm: FC = () => {
  const { createComment, isCreatingComment } = useContext(PostContext)
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<{ content: string }>({ defaultValues: { content: '' } })

  return (
    <Box component="form" sx={containerStyle} onSubmit={handleSubmit(createComment)}>
      <StyledInput
        error={errors.content}
        label="New comment"
        multiline
        {...register('content', { required: true })}
      />
      <StyledButton isLoading={isCreatingComment} disabled={!isDirty} type="submit">
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
