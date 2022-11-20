import { Box, Collapse, LinearProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { getImagePosts } from '../../../api/queries/imagePosts'
import { ImagePost } from '../../../interfaces/imagePosts'
import { PostItem } from './PostItem'


export const PostsPage = () => {
  const [searchParams] = useSearchParams()
  const [posts, setPosts] = useState<ImagePost[]>([])
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page') || 1))
  const { isFetching, refetch } = useQuery({
    queryKey: ['image_posts'],
    queryFn: () => getImagePosts(currentPage),
    onSuccess: (data) => {
      if (data.length > 0) {
        setCurrentPage(prev => prev + 1)
        setPosts(prev => prev.concat(data))
      }
    },
  })

  useScrolledDown(() => {
    if (!isFetching) refetch()
  }, [isFetching])

  return (
    <>
      <Box sx={{
        paddingTop: '2rem',
        maxWidth: '36rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '10rem',
      }}>
        {posts.map(post => <PostItem key={post.id} post={post}/>)}
      </Box>

      <Collapse sx={{ position: 'fixed', width: '100%', bottom: '0rem' }} in={isFetching}>
        <LinearProgress />
      </Collapse>
    </>
  )
}

const useScrolledDown = (onScrolledDown: () => void, ...dependencies: unknown[]) => {
  useEffect(() => {
    document.body.onscroll = () => {
      if (document.body.scrollHeight <= window.scrollY + window.innerHeight + 1) {
        onScrolledDown()
      }
    }
  }, dependencies || [])
}
