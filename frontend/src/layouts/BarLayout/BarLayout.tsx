import { Box } from '@mui/material'
import { FC, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

export const BarLayout: FC = () => {
  const [openSideBar, setOpenSideBar] = useState(false)
  const closeSideBar = () => setOpenSideBar(false)

  return (
    <Box>
      <TopBar setOpen={setOpenSideBar}/>
      <Sidebar onClose={closeSideBar} open={openSideBar}/>
      <Box sx={containerStyle}>
        <Outlet/>
      </Box>
    </Box>
  )
}

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  margin: 'auto',
  maxWidth: '50rem',
  paddingY: '5rem',
}
