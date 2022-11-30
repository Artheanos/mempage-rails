import { Box, Collapse, LinearProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { getImagePosts } from '../../../api/queries/imagePosts'
import { ImagePost } from '../../../interfaces/imagePosts'
import { PostItem } from '../../../components/posts/PostItem'

const PAGE_SIZE = 2

export const PostsPage = () => {
  const [searchParams] = useSearchParams()
  const [posts, setPosts] = useState<ImagePost[]>([])
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page') || 0))
  const [lastPage, setLastPage] = useState(-1)

  const { isFetching, refetch } = useQuery({
    queryKey: ['image_posts'],
    queryFn: () => getImagePosts(currentPage + 1),
    onSuccess: ({ results, count }) => {
      setLastPage(Math.ceil(count / PAGE_SIZE))
      if (results.length > 0) {
        setPosts(prev => prev.concat(results))
        setCurrentPage(prev => prev + 1)
      }
    },
  })

  useScrolledDown(() => {
    if (!isFetching && currentPage !== lastPage) refetch()
  }, [isFetching])

  return (
    <>
      <Box sx={{
        paddingTop: '2rem',
        width: '100%',
        maxWidth: '36rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '10rem',
      }}>
        {posts.map(post => <PostItem key={post.id} post={post}/>)}
      </Box>
      {isFetching}
      <Collapse sx={{ position: 'fixed', width: '100%', bottom: '0rem' }} in={isFetching}>
        <LinearProgress/>
      </Collapse>
    </>
  )
}

const useScrolledDown = (onScrolledDown: () => void, ...dependencies: unknown[]) => {
  useEffect(() => {
    document.body.onscroll = () => {
      if (document.body.scrollHeight <= window.scrollY + window.innerHeight + 0.5) {
        onScrolledDown()
      }
    }

    return (): void => {
      document.body.onscroll = null
    }
  }, dependencies || [])
}
