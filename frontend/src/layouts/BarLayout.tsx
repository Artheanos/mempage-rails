import { FC, useContext, useState } from "react";
import {
  alpha,
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet, useLocation } from "react-router-dom";

import { localRoutes } from "../api/routesBuilder";
import { StarHalf, UploadFile, VerifiedUser, WbSunny } from "@mui/icons-material";
import { UserContext } from "../contexts/UserContext";

export const BarLayout: FC = () => {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)
  const { theme, toggleMode } = useContext(UserContext)

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          backdropFilter: 'blur(5rem)',
          backgroundColor: alpha(theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.background.paper, 0.9),
        }}
      >
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
          <Button sx={{ ml: 'auto', color: theme.palette.common.white }} onClick={toggleMode}>
            {theme.palette.mode === 'dark' ? <WbSunny/> : <StarHalf/>}
          </Button>
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
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
        maxWidth: '50rem',
        paddingTop: '5rem',
      }}>
        <Outlet/>
      </Box>
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

interface EntryConfig {
  path: string
  title: string
  icon: JSX.Element
  visible?: boolean
}

const useConfig = (onClose: () => void) => {
  const { user } = useContext(UserContext)

  const config: EntryConfig[] = [
    {
      path: localRoutes.imagePosts.add,
      title: 'Upload',
      icon: <UploadFile/>,
    },
    {
      path: localRoutes.login,
      title: 'Login',
      icon: <VerifiedUser/>,
      visible: !Boolean(user)
    },
    {
      path: localRoutes.logout,
      title: 'Logout',
      icon: <VerifiedUser/>,
      visible: Boolean(user)
    },
  ]

  return config.filter(i => !i.hasOwnProperty('visible') || i.visible === true).map((entry, key) => (
    <Entry key={key} onClose={onClose} {...entry}/>
  ))
}
