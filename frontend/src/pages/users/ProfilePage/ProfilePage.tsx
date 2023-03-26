import { FC, useContext, useState } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'

import { getUser } from '@src/api/queries/users'
import { ProfileForm } from './ProfileForm'
import { updateProfile } from '@src/api/queries/auth'
import { UserContext } from '@src/contexts/UserContext'
import { UserInfo } from '@src/components/users/UserInfo'
import { NotificationContext } from '@src/components/Notification'

export const ProfilePage: FC = () => {
  const { user } = useContext(UserContext)
  const { isLoading: isLoadingUser, data } = useQuery(['user'], { queryFn: () => getUser(user!.id) })
  const { mutateAsync, isLoading: isMutating } = useMutation({ mutationFn: updateProfile })
  const [resetCounter, setResetCounter] = useState(0)
  const { setNotification } = useContext(NotificationContext)

  const onSubmit = async(data: any) => {
    await mutateAsync(data)
    setResetCounter(prev => prev + 1)
    setNotification({ message: 'Password changed', color: 'success' })
  }

  if (isLoadingUser) return <CircularProgress/>

  return (
    <Box sx={{ display: 'flex', gap: '6rem' }}>
      <UserInfo user={data!}/>
      <ProfileForm user={data!} onSubmit={onSubmit} resetCounter={resetCounter} isLoading={isMutating}/>
    </Box>
  )
}
