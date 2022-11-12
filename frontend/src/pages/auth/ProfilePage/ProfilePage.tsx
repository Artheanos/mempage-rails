import { FC, useContext, useState } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'

import { ProfileCabinet } from './ProfileCabinet'
import { ProfileForm } from './ProfileForm'
import { UserContext } from '../../../contexts/UserContext'
import { getUser } from '../../../api/queries/users'
import { updateProfile } from '../../../api/mutations/auth'

export const ProfilePage: FC = () => {
  const { user } = useContext(UserContext)
  const { isLoading: isLoadingUser, data } = useQuery(['user'], { queryFn: () => getUser(user!.user_id) })
  const { mutateAsync, isLoading: isMutating } = useMutation({ mutationFn: updateProfile })
  const [resetCounter, setResetCounter] = useState(0)

  const onSubmit = async(data: any) => {
    await mutateAsync(data)
    setResetCounter(prev => prev + 1)
    alert('Changed')
  }

  if (isLoadingUser) return <CircularProgress/>

  return (
    <Box sx={{ display: 'flex', gap: '6rem' }}>
      <ProfileCabinet user={data!}/>
      <ProfileForm user={data!} onSubmit={onSubmit} resetCounter={resetCounter} isLoading={isMutating}/>
    </Box>
  )
}
