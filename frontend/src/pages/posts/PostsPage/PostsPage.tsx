import { Box } from "@mui/material";
import { getImagePosts } from "../../../api/queries/imagePosts";
import { useQuery } from "@tanstack/react-query";

import { PostItem } from "./PostItem";

export const PostsPage = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['image_posts'],
    queryFn: getImagePosts
  })

  if (isLoading || data === undefined) return <div>Loading</div>

  return (
    <Box sx={{
      paddingTop: '2rem',
      maxWidth: '36rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '10rem'
    }}>
      {data.map(i => <PostItem key={i.id} post={i}/>)}
    </Box>
  )
}
