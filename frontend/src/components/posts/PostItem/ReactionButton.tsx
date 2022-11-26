import { Box, Button } from '@mui/material'
import { FC, useContext } from 'react'
import { SvgIconComponent } from '@mui/icons-material'

import { PostItemContext } from './PostItemContext'
import { ReactionValue } from '../../../interfaces/reactions'
import { UserContext } from '../../../contexts/UserContext'

interface Props {
  reaction: ReactionValue
  ButtonIcon: SvgIconComponent
}

export const ReactionButton: FC<Props> = ({ reaction, ButtonIcon }) => {
  const { user } = useContext(UserContext)
  const { handleReaction, post, currentReaction } = useContext(PostItemContext)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Button onClick={() => handleReaction(reaction)} disabled={!user}>
        <ButtonIcon color={currentReaction === reaction ? 'primary' : 'disabled'}/>
      </Button>
      <div>{post[`${reaction}s` as 'likes' | 'dislikes']}</div>
    </Box>
  )
}
