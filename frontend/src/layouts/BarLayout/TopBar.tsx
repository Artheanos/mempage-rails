import { FC, useContext } from 'react'
import { alpha, AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'
import { localRoutes } from '../../api/routesBuilder'
import { Person, StarHalf, WbSunny } from '@mui/icons-material'
import { UserContext } from '../../contexts/UserContext'

interface Props {
  setOpen(open: boolean): void
}

export const TopBar: FC<Props> = ({ setOpen }) => {
  const { theme, toggleMode } = useContext(UserContext)
  const { user } = useContext(UserContext)

  const defaultColor = theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.background.paper

  return (
    <AppBar
      sx={{
        backdropFilter: 'blur(3rem)',
        backgroundColor: alpha(defaultColor, 0.9),
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
          <Link className="disable-blue" to={localRoutes.root} style={{ fontWeight: 'bold' }}>Mempage Rails</Link>
        </Typography>
        <Box sx={{ ml: 'auto' }}>
          <Link to={localRoutes.profile} style={{ display: user ? '' : 'none' }}>
            <Button sx={{ color: theme.palette.common.white }}>
              <Person/>
            </Button>
          </Link>
          <Button sx={{ color: theme.palette.common.white }} onClick={toggleMode}>
            {theme.palette.mode === 'dark' ? <WbSunny/> : <StarHalf/>}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
