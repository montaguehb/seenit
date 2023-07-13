"use client"

import { createContext, useState } from "react"
import { UserContextType } from "@/lib/types"

const UserContext = createContext<UserContextType>({user: {}, updateUser: () => {}})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState({});
    
    const updateUser = (user: any) => {
        setUser(user)
    }

  return (
    <UserContext.Provider value={{user, updateUser}}>{children}</UserContext.Provider>
  )
}

export default AuthProvider;
export {UserContext};