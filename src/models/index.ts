// Export Prisma client and types
export { prisma } from '@/lib/db'
export * from '@prisma/client'

// Export custom types with specific exports to avoid naming conflicts
export type { 
  UserEntity, 
  CreateUserRequest, 
  UpdateUserRequest, 
  UserProfile, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse 
} from '@/types/User'

export type { 
  CourseEntity, 
  CreateCourseRequest, 
  UpdateCourseRequest, 
  CourseWithDetails,
  LessonEntity,
  CreateLessonRequest,
  EnrollmentEntity,
  CreateEnrollmentRequest
} from '@/types/Course'

export * from '@/types/ApiResponse'
