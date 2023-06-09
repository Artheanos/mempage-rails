import * as React from 'react'
import Typography from '@mui/material/Typography'
import { Box, Card, CardContent, TextField } from '@mui/material'
import { FC } from 'react'

import { User } from '@src/interfaces/auth'

export const UserInfo: FC<{ user: User }> = ({ user }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <TextField label="Email" disabled value={user.email}/>
    <Box sx={{ display: 'flex', gap: '2rem' }}>
      <NumberCard title='Posts' count={user.post_count}/>
      <NumberCard title='Comments' count={user.comment_count}/>
    </Box>
  </Box>
)

const NumberCard: FC<{ title: string, count: number }> = ({ title, count }) => (
  <Card sx={{ width: '6rem', height: '6rem' }}>
    <CardContent sx={{ paddingX: '0' }}>
      <Typography color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h4">
        {count}
      </Typography>
    </CardContent>
  </Card>
)
