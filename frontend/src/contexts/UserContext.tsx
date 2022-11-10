import React, { useMemo, useState } from "react";
import { createTheme, Theme } from "@mui/material";

type ThemeMode = 'dark' | 'light'
interface UserStorage {
  token: string
  user_id: number
}

interface ContextValues {
  login: (user: UserStorage) => void
  logout: () => void
  theme: Theme
  toggleMode: () => void
  user?: UserStorage
}

export const UserContext = React.createContext<ContextValues>({
  login: (_user) => {
  },
  logout: () => {
  },
  theme: createTheme({}),
  toggleMode: () => {
  },
})

export const UserContextProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserStorage | undefined>(JSON.parse(localStorage.getItem('user') || 'null'))
  const [themeMode, setThemeMode] = useState<ThemeMode>(localStorage.getItem('theme') as ThemeMode || 'dark')
  const theme = useMemo(() => {
    const { palette, ...other } = commonTheme

    return createTheme({
      palette: { ...palette, mode: themeMode },
      ...other
    });
  }, [themeMode])

  const login = (user: UserStorage) => {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(undefined)
  }

  const toggleMode = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', newMode)
    setThemeMode(newMode)
  }

  return (
    <UserContext.Provider value={{ login, logout, user, theme, toggleMode }}>
      {children}
    </UserContext.Provider>
  )
}

const commonTheme: Partial<Omit<Theme, 'typography'>> & { typography: Partial<Theme['typography']> } = {
  typography: {
    fontFamily: 'Inter, Avenir, Helvetica, Arial, sans-serif',
    button: {
      textTransform: 'none'
    }
  }
}
