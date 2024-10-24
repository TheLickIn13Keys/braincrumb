export const endpoints = {
    auth: {
      login: '/api/v1/auth/login',
      signup: '/api/v1/auth/signup',
      logout: '/api/v1/auth/logout',
    },
    users: {
      me: '/api/v1/users/me',
      academicInfo: '/api/v1/users/academic-info',
    },
    courses: {
      list: '/api/v1/courses',
      progress: (courseId: string) => `/api/v1/courses/${courseId}/progress`,
    },
  } as const;