"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useUser, useClerk } from "@clerk/nextjs"
import { syncUser } from "./actions/user"

export interface User {
  id: string
  email: string
  name: string
  username: string
  image?: string
  bio?: string
  seoTitle?: string
  seoDescription?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  logout: () => void
  updateUser: (data: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user: clerkUser, isLoaded } = useUser()
  const { signOut } = useClerk()
  const [dbUser, setDbUser] = useState<User | null>(null)
  const [isSyncing, setIsSyncing] = useState(true)

  useEffect(() => {
    async function sync() {
      if (clerkUser) {
        try {
          const synced = await syncUser()
          if (synced) {
            setDbUser({
              id: synced.id,
              email: synced.email,
              name: synced.name || "",
              username: synced.username,
              image: synced.image || undefined,
              bio: synced.bio || undefined,
              seoTitle: synced.seoTitle || undefined,
              seoDescription: synced.seoDescription || undefined,
            })
          }
        } catch (error) {
          console.error("Failed to sync user:", error)
        }
      } else {
        setDbUser(null)
      }
      setIsSyncing(false)
    }

    if (isLoaded) {
      if (clerkUser) {
        sync()
      } else {
        setDbUser(null)
        setIsSyncing(false)
      }
    }
  }, [clerkUser, isLoaded])

  const logout = () => {
    signOut()
  }

  const updateUser = (data: Partial<User>) => {
    if (dbUser) {
      setDbUser({ ...dbUser, ...data })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user: dbUser,
        isLoading: !isLoaded || isSyncing,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
