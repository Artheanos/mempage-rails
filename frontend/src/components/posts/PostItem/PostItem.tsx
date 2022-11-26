import { Box, Card, CardContent, CardMedia } from '@mui/material'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { ThumbDown, ThumbUp } from '@mui/icons-material'
import { useMutation } from '@tanstack/react-query'

import { apiHost, localRoutes } from '../../../api/routesBuilder'
import { deleteReaction, upsertReaction } from '../../../api/queries/reactions'
import { ImagePost } from '../../../interfaces/imagePosts'
import { PostItemContext } from './PostItemContext'
import { ReactionButton } from './ReactionButton'
import { ReactionValue } from '../../../interfaces/reactions'

interface Props {
  post: ImagePost
}

export const PostItem: FC<Props> = ({ post }) => {
  const src = `${apiHost}/${post.image}`
  const [currentReaction, setCurrentReaction] = useState<ReactionValue | null>(post.current_user_reaction)

  const upsertMutation = useMutation({
    mutationFn: upsertReaction,
    onSuccess: (_d, variables, _c) => setCurrentReaction(variables.reaction),
  })

  const destroyMutation = useMutation({
    mutationFn: deleteReaction,
    onSuccess: () => setCurrentReaction(null),
  })

  const handleReaction = (reaction: ReactionValue) => {
    if (reaction === currentReaction) {
      destroyMutation.mutate({ image_post_id: post.id })
    } else {
      upsertMutation.mutate({ image_post_id: post.id, reaction })
    }
  }

  return (
    <Card>
      <CardContent sx={{ position: 'relative', padding: '0.1rem', width: '100%' }}>
        <Box>
          <Link className="disable-blue" to={localRoutes.imagePosts.show(post.id)}>
            <h2>{post.header}</h2>
          </Link>
          <Link className="disable-blue" to={localRoutes.users.show(post.user.id)}>
            <p>{post.user.email}</p>
          </Link>
        </Box>

        <Box sx={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex' }}>
          <PostItemContext.Provider value={{ handleReaction, post, currentReaction }}>
            <ReactionButton reaction='like' ButtonIcon={ThumbUp}/>
            <ReactionButton reaction='dislike' ButtonIcon={ThumbDown}/>
          </PostItemContext.Provider>
        </Box>
      </CardContent>

      <Link className="disable-blue" to={localRoutes.imagePosts.show(post.id)}>
        <CardMedia
          component="img"
          image={src}
        />
      </Link>
    </Card>
  )
}
