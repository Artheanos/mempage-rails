import { FC, useContext } from "react";
import { Box, CircularProgress, Paper } from "@mui/material";
import { UserContext } from "../../../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../api/queries/users";
import { ProfileForm } from "./ProfileForm";
import { ProfileCabinet } from "./ProfileCabinet";

export const ProfilePage: FC = () => {
  const { user } = useContext(UserContext)
  const { isLoading, data } = useQuery(['user'], { queryFn: () => getUser(user!.user_id) })

  if (isLoading) return <CircularProgress/>

  return (
    <Box sx={{ display: 'flex', gap: '6rem' }}>
        <ProfileCabinet user={data!}/>
        <ProfileForm user={data!}/>
    </Box>
  )
}
