import { FC, useContext, useState } from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet, useLocation } from "react-router-dom";

import { localRoutes } from "../api/routesBuilder";
import { UploadFile, VerifiedUser } from "@mui/icons-material";
import { UserContext } from "../contexts/UserContext";

export const BarLayout: FC = () => {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" component="div">
            <Link className="disable-blue" to={localRoutes.root}>Mempage Rails</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        onClose={onClose}
      >
        <List
          sx={{ paddingTop: '2rem', minWidth: '12rem' }}
        >
          {useConfig(onClose)}
        </List>
      </Drawer>
      <div className="BarLayout-container">
        <Outlet/>
      </div>
    </Box>
  )
}

const Entry: FC<{ path: string, title: string, icon: JSX.Element, onClose: () => void }> = ({
  path,
  title,
  icon,
  onClose
}) => {
  const active = useLocation().pathname.startsWith(path)

  return (
    <Link to={path} className="disable-blue" onClick={onClose}>
      <ListItemButton selected={active} sx={{ paddingX: '1.5rem' }}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={title}/>
      </ListItemButton>
    </Link>
  )
}

const useConfig = (onClose: () => void) => {
  const { user } = useContext(UserContext)

  return [
    <Entry path={localRoutes.imagePosts.add} title={'Upload'} icon={<UploadFile/>} onClose={onClose}/>,
    !user.token && <Entry path={localRoutes.login} title={'Login'} icon={<VerifiedUser/>} onClose={onClose}/>,
  ].filter(Boolean)
}
