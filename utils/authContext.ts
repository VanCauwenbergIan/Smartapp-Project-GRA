import { AuthCredential, User } from 'firebase/auth'
import React, { useContext } from 'react'

export interface AuthContextType {
  user: User | undefined
  setUser: Function
}

export const AuthContext = React.createContext<AuthContextType>({
  user: undefined,
  setUser: (u: User) => {},
})

export const useAuth = () => useContext(AuthContext)
