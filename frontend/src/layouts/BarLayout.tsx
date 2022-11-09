import { FC, useState } from "react";
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
  Typography,
  useTheme
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet, useLocation } from "react-router-dom";

import { localRoutes } from "../api/routesBuilder";
import { UploadFile, VerifiedUser } from "@mui/icons-material";

export const BarLayout: FC = () => {
  const [open, setOpen] = useState(false)

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
        onClose={() => setOpen(false)}
      >
        <List
          sx={{ paddingTop: '2rem', minWidth: '12rem' }}
        >
          <Entry path={localRoutes.imagePosts.add} title={'Upload'} icon={<UploadFile/>}/>
          <Entry path={localRoutes.login} title={'Login'} icon={<VerifiedUser/>}/>
        </List>
      </Drawer>
      <div className="BarLayout-container">
        <Outlet/>
      </div>
    </Box>
  )
}


const Entry: FC<{ path: string, title: string, icon: JSX.Element }> = ({ path, title, icon }) => {
  const active = useLocation().pathname.startsWith(path)

  return (
    <Link to={path} className="disable-blue">
      <ListItemButton selected={active} sx={{ paddingX: '1.5rem' }}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={title}/>
      </ListItemButton>
    </Link>
  )
}
