import { prisma } from '@/lib/db'
import { UserEntity, CreateUserRequest, UpdateUserRequest, UserProfile } from '@/types/User'
import { logger } from '@/lib/logger'

export class UserRepository {
  async findById(id: string): Promise<UserEntity | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id }
      })
      return user as UserEntity | null
    } catch (error) {
      logger.error('Error finding user by ID', error as Error, { id })
      throw error
    }
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email }
      })
      return user as UserEntity | null
    } catch (error) {
      logger.error('Error finding user by email', error as Error, { email })
      throw error
    }
  }

  async findByClerkId(clerkId: string): Promise<UserEntity | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { clerkId }
      })
      return user as UserEntity | null
    } catch (error) {
      logger.error('Error finding user by Clerk ID', error as Error, { clerkId })
      throw error
    }
  }

  async create(data: CreateUserRequest): Promise<UserEntity> {
    try {
      const user = await prisma.user.create({
        data: {
          clerkId: data.clerkId,
          email: data.email,
          name: data.name,
          role: data.role
        }
      })
      return user as UserEntity
    } catch (error) {
      logger.error('Error creating user', error as Error, { data })
      throw error
    }
  }

  async update(id: string, data: UpdateUserRequest): Promise<UserEntity> {
    try {
      const user = await prisma.user.update({
        where: { id },
        data
      })
      return user as UserEntity
    } catch (error) {
      logger.error('Error updating user', error as Error, { id, data })
      throw error
    }
  }

  async delete(id: string): Promise<UserEntity> {
    try {
      const user = await prisma.user.delete({
        where: { id }
      })
      return user as UserEntity
    } catch (error) {
      logger.error('Error deleting user', error as Error, { id })
      throw error
    }
  }

  async findAll(limit = 10, offset = 0): Promise<UserEntity[]> {
    try {
      const users = await prisma.user.findMany({
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' }
      })
      return users as UserEntity[]
    } catch (error) {
      logger.error('Error finding all users', error as Error, { limit, offset })
      throw error
    }
  }

  async count(): Promise<number> {
    try {
      return await prisma.user.count()
    } catch (error) {
      logger.error('Error counting users', error as Error)
      throw error
    }
  }

  async getUserProfile(id: string): Promise<UserProfile | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          _count: {
            select: { enrollments: true }
          }
        }
      })

      if (!user) return null

      // Get completed lessons count
      const completedLessonsCount = await prisma.lessonProgress.count({
        where: {
          userId: id,
          completed: true
        }
      })

      return {
        id: user.id,
        email: user.email,
        name: user.name || undefined,
        role: user.role,
        enrollmentsCount: user._count.enrollments,
        completedLessonsCount
      }
    } catch (error) {
      logger.error('Error getting user profile', error as Error, { id })
      throw error
    }
  }
}
