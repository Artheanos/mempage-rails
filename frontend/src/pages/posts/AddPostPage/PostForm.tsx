import { useForm } from "react-hook-form";
import { FC } from "react";
import { Alert, Box, TextField } from "@mui/material";
import { StyledButton } from "../../../components/forms/StyledButton";
import { CheckCircle } from "@mui/icons-material";

interface Props {
  onSubmit: (form: PostInput) => void
}

export interface PostInput {
  header: string
  file: FileList
}

export const PostForm: FC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<PostInput>()

  return (
    <div className="PostForm">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
      >
        <TextField label='Header' {...register('header')} variant="outlined"/>
        <div>
          {/*@ts-ignore*/}
          <StyledButton component="label">
            Choose file
            <input
              {...register('file', { required: true })}
              accept="image/*"
              style={{ display: 'none' }}
              type="file"
            />
            {watch('file')?.length > 0 && <CheckCircle sx={{ ml: '0.5rem' }}/>}
          </StyledButton>
          {errors.file?.type === 'required' &&
              <Alert sx={{ mt: '1rem' }} severity="error" variant="outlined">Required file</Alert>}
        </div>
        <div>
          <StyledButton type="submit">Submit</StyledButton>
        </div>
      </Box>
    </div>
  )
}
