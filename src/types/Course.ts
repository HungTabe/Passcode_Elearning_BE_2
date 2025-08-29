import { Level } from '@prisma/client'

export interface CourseEntity {
  id: string
  code: string
  name: string
  description: string
  videoUrl: string
  thumbnail?: string
  requirements: string[]
  outcomes: string[]
  duration: number
  level: Level
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateCourseRequest {
  code: string
  name: string
  description: string
  videoUrl: string
  thumbnail?: string
  requirements: string[]
  outcomes: string[]
  duration: number
  level: Level
  isActive?: boolean
}

export interface UpdateCourseRequest {
  code?: string
  name?: string
  description?: string
  videoUrl?: string
  thumbnail?: string
  requirements?: string[]
  outcomes?: string[]
  duration?: number
  level?: Level
  isActive?: boolean
}

export interface CourseWithDetails extends CourseEntity {
  lessons: LessonEntity[]
  enrollmentsCount: number
}

export interface LessonEntity {
  id: string
  courseId: string
  title: string
  content: string
  videoUrl: string
  duration: number
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface CreateLessonRequest {
  courseId: string
  title: string
  content: string
  videoUrl: string
  duration: number
  order: number
}

export interface EnrollmentEntity {
  id: string
  userId: string
  courseId: string
  enrolledAt: Date
}

export interface CreateEnrollmentRequest {
  userId: string
  courseId: string
}
