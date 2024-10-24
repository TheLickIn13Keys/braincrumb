import { useState, useEffect } from 'react'
import axios from 'axios'

interface CourseProgress {
  courseId: string
  progress: number
  lastAccessed: string
}

export function useCourseProgress(userId: string) {
  const [progress, setProgress] = useState<CourseProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProgress() {
      try {
        const response = await axios.get(`/api/v1/users/${userId}/progress`)
        setProgress(response.data)
      } catch (err) {
        setError('Failed to fetch course progress')
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [userId])

  return { progress, loading, error }
}