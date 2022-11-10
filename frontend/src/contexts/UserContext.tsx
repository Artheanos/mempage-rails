import React, { useMemo, useState } from "react";
import { createTheme, Theme } from "@mui/material";

type ThemeMode = 'dark' | 'light'

interface ContextValues {
  login: (token: string) => void
  logout: () => void
  theme: Theme
  toggleMode: () => void
  user?: { token?: string }
}

export const UserContext = React.createContext<ContextValues>({
  login: (token: string) => {},
  logout: () => {},
  theme: createTheme({}),
  toggleMode: () => {},
})

export const UserContextProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ token?: string }>()
  const [themeMode, setThemeMode] = useState<ThemeMode>(localStorage.getItem('theme') as ThemeMode || 'dark')
  const theme = useMemo(() => (createTheme({ palette: { mode: themeMode }, ...commonTheme })), [themeMode])

  const login = (token: string) => {
    localStorage.setItem('token', token)
    setUser({ token })
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(undefined)
  }

  const toggleMode = () => setThemeMode(prev => prev === 'light' ? 'dark' : 'light')

  return (
    <UserContext.Provider value={{ login, logout, user, theme, toggleMode }}>
      {children}
    </UserContext.Provider>
  )
}

const commonTheme: { typography: Partial<Theme['typography']> } = {
  typography: {
    fontFamily: 'Inter, Avenir, Helvetica, Arial, sans-serif',
    button: {
      textTransform: 'none'
    }
  },
}
