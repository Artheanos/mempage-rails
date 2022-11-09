import { FC } from "react";
import { Box } from "@mui/material";
import { PostForm, PostInput } from "./PostForm";
import { apiRoutes } from "../../../api/routesBuilder";
import { jsonFetch } from "../../../utils/api";

export const AddPostPage: FC = () => {
  const onSubmit = async (form: PostInput) => {
    const data = new FormData();
    data.append('image_post[header]', form.header)
    data.append('image_post[image]', form.file.item(0)!)
    const response = await jsonFetch(apiRoutes.imagePosts.root, { data, method: "POST" })
    console.log(response)
  }

  return (
    <Box>
      <PostForm onSubmit={onSubmit}/>
    </Box>
  )
}
