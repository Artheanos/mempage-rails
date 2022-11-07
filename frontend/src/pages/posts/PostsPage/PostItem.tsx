import { FC } from "react";

import { ImagePost } from "../../../interfaces/imagePosts";

interface Props {
  post: ImagePost
}

export const PostItem: FC<Props> = ({post}) => {
  const src = `http://localhost:3000/${post.image}`

  return (
    <div className="PostItem">
      <p>{post.header}</p>
      <img src={src} alt={post.header}/>
    </div>
  )
}
