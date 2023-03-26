import React, { ReactNode, useState } from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { NotificationContext, NotificationProps } from './NotificationContext'

export const NotificationContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [props, setProps] = useState<Partial<NotificationProps>>()
  const [open, setOpen] = useState(false)

  return (
    <NotificationContext.Provider value={{
      setNotification: (props) => {
        setTimeout(() => {
          setProps({ ...DEFAULT_PROPS, ...props })
          setOpen(true)
        }, open ? ANIMATION_DURATION : 0)
      },
    }}>
      <Snackbar open={open} onClose={() => setOpen(false)} {...{
        ...props,
        message: undefined,
      }}>
        <Alert severity={props?.color}>{props?.message}</Alert>
      </Snackbar>
      {children}
    </NotificationContext.Provider>
  )
}

const ANIMATION_DURATION = 100
const DEFAULT_PROPS: NotificationProps = {
  autoHideDuration: 4000,
  color: 'info',
}
