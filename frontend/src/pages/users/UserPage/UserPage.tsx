import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '@src/api/queries/users'
import { Box, CircularProgress } from '@mui/material'
import { UserInfo } from '@src/components/users/UserInfo'

interface Props {
}

export const UserPage: FC<Props> = () => {
  const { id } = useParams()
  const { isLoading, data: user } = useQuery({
    queryKey: ['image_post', id],
    queryFn: () => getUser(+id!),
  })

  if (isLoading) return <CircularProgress/>

  return (
    <Box>
      <UserInfo user={user!}/>
    </Box>
  )
}
