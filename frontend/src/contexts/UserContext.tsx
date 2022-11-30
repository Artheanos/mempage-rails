import React, { useEffect, useMemo } from 'react'
import { createTheme, Theme } from '@mui/material'

import { User } from '../interfaces/auth'
import { ThemeOptions } from '@mui/material/styles/createTheme'
import { useLocalStorage } from '../utils/storage'
import { useMutation } from '@tanstack/react-query'
import { refreshToken } from '../api/queries/auth'
import { Minutes } from '../utils/time'

type ThemeMode = 'dark' | 'light'

interface UserStorage extends User {
  token: string
}

interface ContextValues {
  login: (user: UserStorage) => void
  logout: () => void
  theme: Theme
  toggleMode: () => void
  user: UserStorage | null
}

export const UserContext = React.createContext<ContextValues>({
  login: (_data) => {
  },
  logout: () => {
  },
  theme: createTheme({}),
  toggleMode: () => {
  },
  user: null,
})

export const UserContextProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useLocalStorage<UserStorage>('user')
  const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>('theme')

  const { mutate: refreshTokenMutate } = useMutation({
    mutationFn: refreshToken,
    onSuccess: ({ user, token }) => login({ ...user, token }),
    onError: ({ request: { status } }) => {
      if (status === 401) logout()
    },
  })

  const theme = useMemo(() => {
    const theme = themeMode === 'dark' ? darkTheme : lightTheme
    return createTheme({ ...theme, ...commonTheme })
  },
  [themeMode],
  )

  const login = (user: UserStorage): void => {
    setUser(user)
    setTimeout(() => {
      if (user) refreshTokenMutate()
    }, 4 * Minutes)
  }

  const logout = (): void => setUser(null)

  const toggleMode = (): void => {
    const newMode = themeMode === 'light' ? 'dark' : 'light'
    setThemeMode(newMode)
  }

  useEffect(() => {
    if (user) refreshTokenMutate()
  }, [])

  return (
    <UserContext.Provider value={{ login, logout, user, theme, toggleMode }}>
      {children}
    </UserContext.Provider>
  )
}

const commonTheme: ThemeOptions = {
  typography: {
    fontFamily: 'Inter, Avenir, Helvetica, Arial, sans-serif',
    button: {
      textTransform: 'none',
    },
  },
}

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
  },
  ...commonTheme,
}

const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    background: {
      default: '#fafafa',
    },
  },
}
