export interface Course {
    id: string
    title: string
    subtitle: string
    image: string
    progress: number
  }
  
  export interface RecommendedCourse {
    id: string
    title: string
    description: string
    image: string
  }
  
  export interface Activity {
    id: string
    title: string
    description: string
    time: string
    image: string
  }