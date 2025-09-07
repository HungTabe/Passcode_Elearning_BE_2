import { Level } from '@prisma/client'

// Temporary enum until Prisma client is regenerated
export enum LessonType {
  VIDEO = 'VIDEO',
  TEXT = 'TEXT',
  QUIZ = 'QUIZ',
  ASSIGNMENT = 'ASSIGNMENT'
}

export interface CourseEntity {
  id: string
  code: string
  name: string
  title: string
  description: string
  videoUrl: string
  thumbnail?: string
  requirements: string[]
  outcomes: string[]
  duration: number | string
  level: Level
  isActive: boolean
  // New fields for enhanced course information
  instructor: string
  rating: number
  students: number
  lessons: number
  category: string
  price: number
  originalPrice?: number
  image: string
  previewUrl: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateCourseRequest {
  code: string
  name: string
  title: string
  description: string
  videoUrl: string
  thumbnail?: string
  requirements: string[]
  outcomes: string[]
  duration: number
  level: Level
  isActive?: boolean
  // New fields for enhanced course information
  instructor: string
  rating?: number
  students?: number
  lessons?: number
  category: string
  price: number
  originalPrice?: number
  image: string
  previewUrl: string
}

export interface UpdateCourseRequest {
  code?: string
  name?: string
  title?: string
  description?: string
  videoUrl?: string
  thumbnail?: string
  requirements?: string[]
  outcomes?: string[]
  duration?: number
  level?: Level
  isActive?: boolean
  // New fields for enhanced course information
  instructor?: string
  rating?: number
  students?: number
  lessons?: number
  category?: string
  price?: number
  originalPrice?: number
  image?: string
  previewUrl?: string
}

export interface CourseWithDetails extends Omit<CourseEntity, 'lessons'> {
  lessons: LessonEntity[]
  enrollmentsCount: number
}

export interface CurriculumSectionEntity {
  id: string
  courseId: string
  title: string
  order: number
  lessons: LessonEntity[]
  createdAt: Date
  updatedAt: Date
}

export interface LessonEntity {
  id: string
  courseId: string
  curriculumSectionId?: string | null
  title: string
  content: string
  videoUrl: string
  duration: number
  order: number
  type: LessonType
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

// Interface for detailed course response matching mock data structure
export interface CourseDetailResponse {
  id: string
  title: string
  instructor: string
  rating: number
  students: number
  duration: string
  lessons: number
  level: string
  description: string
  price: number
  originalPrice?: number
  image: string
  videoUrl: string
  curriculum: CurriculumSection[]
  requirements: string[]
  outcomes: string[]
}

export interface CurriculumSection {
  id: string
  title: string
  lessons: LessonDetail[]
}

export interface LessonDetail {
  id: string
  title: string
  duration: string
  type: string
}
