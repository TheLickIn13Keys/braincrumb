
export interface ApiResponse<T> {
    data: T
    message?: string
  }
  
  export interface LoginResponse {
    user: User
    token: string
  }
  
  export interface ErrorResponse {
    message: string
    status: number
  }
  
  
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
  
  export interface UserProfile {
    academicInfo?: AcademicInfo
    email?: string
  }