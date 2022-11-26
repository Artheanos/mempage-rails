import { Box, Button, ClickAwayListener, Tooltip } from '@mui/material'
import { FC, useContext, useMemo, useState } from 'react'
import { SvgIconComponent } from '@mui/icons-material'

import { PostItemContext } from './PostItemContext'
import { ReactionValue } from '../../../interfaces/reactions'
import { UserContext } from '../../../contexts/UserContext'

interface Props {
  reaction: ReactionValue
  ButtonIcon: SvgIconComponent
}

export const ReactionButton: FC<Props> = ({ reaction, ButtonIcon }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const otherUsersReactionCount = useMemo<number>(() => {
    let reactionCount = post[`${reaction}s` as 'likes' | 'dislikes']
    if (currentReaction === reaction) reactionCount--
    return reactionCount
  }, [])
  const { handleReaction, post, currentReaction } = useContext(PostItemContext)
  const { user } = useContext(UserContext)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
        <Tooltip
          disableFocusListener
          disableTouchListener
          onClose={() => setTooltipOpen(false)}
          open={tooltipOpen}
          title={'Log in to leave a reaction'}
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
      <div>{otherUsersReactionCount + (currentReaction === reaction ? 1 : 0)}</div>
    </Box>
  )
}
