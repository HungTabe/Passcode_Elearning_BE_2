import { Role } from '@prisma/client'

export interface UserEntity {
  id: string
  clerkId: string
  email: string
  name?: string | null
  role: Role
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserRequest {
  clerkId: string
  email: string
  name?: string
  role?: Role
}

export interface UpdateUserRequest {
  name?: string
  role?: Role
}

export interface UserProfile {
  id: string
  email: string
  name?: string
  role: Role
  enrollmentsCount: number
  completedLessonsCount: number
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  user: UserEntity
  token: string
  refreshToken: string
}
