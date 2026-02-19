"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "student" | "consultant" | "admin"

export interface User {
  id: string
  username: string
  firstName: string
  lastName: string
  phone: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string, role: UserRole) => Promise<{ success: boolean; role?: UserRole }>
  signup: (
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string,
  ) => Promise<{ success: boolean; role?: UserRole }>
  loginWithGoogle: () => Promise<{ success: boolean; role?: UserRole }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (
    username: string,
    password: string,
    role: UserRole,
  ): Promise<{ success: boolean; role?: UserRole }> => {
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      firstName: "کاربر",
      lastName: "تست",
      phone: "09123456789",
      role,
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    return { success: true, role }
  }

  const signup = async (
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string,
  ): Promise<{ success: boolean; role?: UserRole }> => {
    let role: UserRole = "student"
    if (username.includes("admin")) {
      role = "admin"
    } else if (username.includes("consultant")) {
      role = "consultant"
    }

    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      firstName,
      lastName,
      phone,
      role,
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    return { success: true, role }
  }

  const loginWithGoogle = async (): Promise<{ success: boolean; role?: UserRole }> => {
    // Mock Google login - در پروژه واقعی، با Google OAuth انجام می‌شود
    const role: UserRole = "student"

    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: "google_user",
      firstName: "کاربر",
      lastName: "گوگل",
      phone: "09123456789",
      role,
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    return { success: true, role }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, loginWithGoogle, logout, isLoading }}>
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
