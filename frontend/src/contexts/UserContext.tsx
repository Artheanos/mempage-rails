import React, { useState } from "react";

export const UserContext = React.createContext<{ login: (token: string) => void, user: { token?: string } }>({
  login: (token: string) => {
  },
  user: { token: undefined }
})

interface Props {
  children?: React.ReactNode
}

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<{ token?: string }>({ token: undefined })
  const login = (token: string) => {
    localStorage.setItem('token', token)
    setUser({ token })
  }

  return (
    <UserContext.Provider value={{ login, user }}>
      {children}
    </UserContext.Provider>
  )
}
