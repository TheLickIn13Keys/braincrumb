"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { API_URL } from '@/src/lib/utils/config'


interface AcademicInfo {
  school: string
  grade: string
  previousClasses: string[]
  targetClass: string
}

interface User {
  id: string
  email: string
  academicInfo?: AcademicInfo
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: { academicInfo?: AcademicInfo }) => Promise<void>
}

interface AuthState {
  user: User | null
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)


const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 5000,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true
  })
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await api.get<User>('/api/v1/users/me')
      setState(prev => ({ ...prev, user: response.data }))
    } catch (error) {
      setState(prev => ({ ...prev, user: null }))
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<{ user: User }>('/api/v1/auth/login', {
        username: email,
        password,
      })

      setState(prev => ({ ...prev, user: response.data.user }))
      
      if (response.data.user.academicInfo) {
        router.push('/dashboard')
      } else {
        router.push('/academic-setup')
      }
    } catch (error) {
      throw new Error('Login failed')
    }
  }

  const signup = async (email: string, password: string) => {
    try {
      const response = await api.post<User>('/api/v1/auth/signup', {
        email,
        password,
      })

      setState(prev => ({ ...prev, user: response.data }))
      router.push('/academic-setup')
    } catch (error) {
      throw new Error('Signup failed')
    }
  }

  const logout = async () => {
    try {
      await api.post('/api/v1/auth/logout')
      setState(prev => ({ ...prev, user: null }))
      router.push('/login')
    } catch (error) {
      throw new Error('Logout failed')
    }
  }

  const updateProfile = async (data: { academicInfo?: AcademicInfo }) => {
    try {
      const response = await api.put<User>('/api/v1/users/profile', data)
      setState(prev => ({ ...prev, user: response.data }))
    } catch (error) {
      throw new Error('Failed to update profile')
    }
  }

  const value = {
    user: state.user,
    loading: state.loading,
    login,
    signup,
    logout,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}