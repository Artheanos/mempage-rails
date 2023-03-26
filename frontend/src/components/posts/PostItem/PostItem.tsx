import { Box, Card, CardContent, CardMedia, Grid } from '@mui/material'
import { FC, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ThumbDown, ThumbUp } from '@mui/icons-material'
import { useMutation } from '@tanstack/react-query'

import { localRoutes } from '@src/api/routesBuilder'
import { deleteReaction, upsertReaction } from '@src/api/queries/reactions'
import { ImagePost } from '@src/interfaces/imagePosts'
import { PostItemContext } from './PostItemContext'
import { ReactionButton } from './ReactionButton'
import { ReactionValue } from '@src/interfaces/reactions'
import { PostPageContext } from '@src/pages/posts/PostPage/PostPageContext'
import { StyledInput } from '@src/components/forms/StyledInput'

interface Props {
  post: ImagePost
}

export const PostItem: FC<Props> = ({ post }) => {
  const src = post.image
  const { isEditing, updatePost } = useContext(PostPageContext)
  const [newHeader, setNewHeader] = useState(post.header)

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
      <CardContent>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex' }}>
              <PostItemContext.Provider value={{ handleReaction, post, currentReaction }}>
                <ReactionButton reaction="like" ButtonIcon={ThumbUp}/>
                <ReactionButton reaction="dislike" ButtonIcon={ThumbDown}/>
              </PostItemContext.Provider>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            {isEditing ? <StyledInput
                label="Title"
                value={newHeader}
                onKeyDown={e => {
                  if (e.code === 'Enter')
                    updatePost({ header: newHeader })
                }}
                onChange={e => {
                  setNewHeader(e.target.value)
                }}
              /> :
              <Link className="disable-blue" to={localRoutes.imagePosts.show(post.id)}>
                <h2>{post.header}</h2>
              </Link>}
            <Link className="disable-blue" to={localRoutes.users.show(post.user.id)}>
              <p>{post.user.email}</p>
            </Link>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={4}>
        </Grid>
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
