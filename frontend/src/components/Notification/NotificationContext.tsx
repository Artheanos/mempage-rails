import React from 'react'
import { AlertColor, SnackbarProps } from '@mui/material'

type NotificationContextValues = {
  setNotification: (props: NotificationProps) => void
}

export type NotificationProps = Partial<SnackbarProps & { color: AlertColor }>

export const NotificationContext = React.createContext<NotificationContextValues>({} as never)
