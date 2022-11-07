import { useQuery } from "@tanstack/react-query";
import { PostItem } from "./PostItem";
import { getImagePosts } from "../../../api/queries/imagePosts";

export const PostsPage = () => {
    const { isLoading, data, error } = useQuery({
        queryKey: ['image_posts'],
        queryFn: () => getImagePosts()
    })

    if (isLoading || data === undefined) return <div>Loading</div>

    return (
        <div>
            {data.map(i => <PostItem key={i.id} post={i}/>)}
        </div>
    )
}
