export interface User {
    id: string
    email: string
    academicInfo?: AcademicInfo
    created_at?: string
    updated_at?: string
  }
  
  export interface AcademicInfo {
    school: string
    grade: string
    previousClasses: string[]
    targetClass: string
  }
  
  export interface LoginRequest {
    email: string
    password: string
  }
  
  export interface SignupRequest {
    email: string
    password: string
  }
  
  export interface Course {
    id: string
    title: string
    subtitle: string
    description: string
    progress: number
    image: string
  }
  
  export interface ApiError {
    message: string
    status: number
  }