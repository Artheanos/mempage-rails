import { Box, Button, ClickAwayListener, Tooltip, Typography } from '@mui/material'
import { FC, useContext, useMemo, useState } from 'react'
import { SvgIconComponent } from '@mui/icons-material'

import { PostItemContext } from './PostItemContext'
import { ReactionValue } from '../../../interfaces/reactions'
import { UserContext } from '../../../contexts/UserContext'
import { Link } from 'react-router-dom'
import { localRoutes } from '../../../api/routesBuilder'

interface Props {
  reaction: ReactionValue
  ButtonIcon: SvgIconComponent
}

export const ReactionButton: FC<Props> = ({ reaction, ButtonIcon }) => {
  const { handleReaction, post, currentReaction } = useContext(PostItemContext)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const otherUsersReactionCount = useMemo<number>(() => {
    let reactionCount = post[`${reaction}s` as 'likes' | 'dislikes']
    if (currentReaction === reaction) reactionCount--
    return reactionCount
  }, [])
  const { user } = useContext(UserContext)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
        <Tooltip
          disableFocusListener
          disableTouchListener
          onClose={() => setTooltipOpen(false)}
          open={tooltipOpen}
          title={<div><Link to={localRoutes.login}>Log in</Link> to leave a reaction</div>}
        >
          <Button
            onClick={() => {
              if (user) handleReaction(reaction)
              else setTooltipOpen(true)
            }}
          >
            <ButtonIcon color={currentReaction === reaction ? 'primary' : 'disabled'}/>
          </Button>
        </Tooltip>
      </ClickAwayListener>
      <Typography fontSize='0.95rem' color="text.secondary">{otherUsersReactionCount + (currentReaction === reaction ? 1 : 0)}</Typography>
    </Box>
  )
}
