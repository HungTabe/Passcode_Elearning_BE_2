export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
  },
  USERS: {
    BASE: '/api/users',
    PROFILE: '/api/users/profile',
    ENROLL: '/api/users/enroll',
    PROGRESS: '/api/users/progress',
  },
  COURSES: {
    BASE: '/api/courses',
    BY_ID: (id: string) => `/api/courses/${id}`,
  },
  BLOG: {
    BASE: '/api/blog/posts',
    BY_ID: (id: string) => `/api/blog/posts/${id}`,
  },
} as const

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  COURSES: '/courses',
  BLOG: '/blog',
} as const
