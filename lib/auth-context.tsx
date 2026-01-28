"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  email: string
  name: string
  username: string
  avatar?: string
  bio?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (email: string, password: string, name: string, username: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateUser: (data: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = "bento_auth"
const USERS_KEY = "bento_users"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setUser(parsed)
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const getUsers = (): Record<string, { user: User; password: string }> => {
    const stored = localStorage.getItem(USERS_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return {}
      }
    }
    return {}
  }

  const saveUsers = (users: Record<string, { user: User; password: string }>) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const users = getUsers()
    const userEntry = users[email.toLowerCase()]

    if (!userEntry) {
      return { success: false, error: "No account found with this email" }
    }

    if (userEntry.password !== password) {
      return { success: false, error: "Incorrect password" }
    }

    setUser(userEntry.user)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userEntry.user))
    return { success: true }
  }

  const signup = async (
    email: string,
    password: string,
    name: string,
    username: string
  ): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const users = getUsers()

    if (users[email.toLowerCase()]) {
      return { success: false, error: "An account with this email already exists" }
    }

    // Check if username is taken
    const usernameTaken = Object.values(users).some(
      (u) => u.user.username.toLowerCase() === username.toLowerCase()
    )
    if (usernameTaken) {
      return { success: false, error: "This username is already taken" }
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email: email.toLowerCase(),
      name,
      username: username.toLowerCase(),
      bio: "",
      createdAt: new Date().toISOString(),
    }

    users[email.toLowerCase()] = { user: newUser, password }
    saveUsers(users)

    setUser(newUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const updateUser = (data: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...data }
    setUser(updatedUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser))

    // Also update in users store
    const users = getUsers()
    if (users[user.email]) {
      users[user.email].user = updatedUser
      saveUsers(users)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUser }}>
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
