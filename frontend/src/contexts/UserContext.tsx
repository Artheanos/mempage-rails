import React, { useState } from "react";

export const UserContext = React.createContext({
  login: (token: string) => {},
  user: {}
})

interface Props {
  children?: React.ReactNode
}

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState({})
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
