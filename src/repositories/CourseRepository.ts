import { prisma } from '@/lib/db'
import { 
  CourseEntity, 
  CreateCourseRequest, 
  UpdateCourseRequest, 
  CourseWithDetails,
  CreateEnrollmentRequest,
  EnrollmentEntity
} from '@/types/Course'
import { logger } from '@/lib/logger'

export class CourseRepository {
  async findById(id: string): Promise<CourseEntity | null> {
    try {
      const course = await prisma.course.findUnique({
        where: { id }
      })
      return course as CourseEntity | null
    } catch (error) {
      logger.error('Error finding course by ID', error as Error, { id })
      throw error
    }
  }

  async findByCode(code: string): Promise<CourseEntity | null> {
    try {
      const course = await prisma.course.findUnique({
        where: { code }
      })
      return course as CourseEntity | null
    } catch (error) {
      logger.error('Error finding course by code', error as Error, { code })
      throw error
    }
  }

  async findByIdWithDetails(id: string): Promise<CourseWithDetails | null> {
    try {
      const course = await prisma.course.findUnique({
        where: { id },
        include: {
          lessons: {
            orderBy: { order: 'asc' }
          },
          _count: {
            select: { enrollments: true }
          }
        }
      })
      if (!course) return null
      
      return {
        ...course,
        enrollmentsCount: course._count.enrollments
      } as CourseWithDetails
    } catch (error) {
      logger.error('Error finding course with details', error as Error, { id })
      throw error
    }
  }

  async findAll(limit = 10, offset = 0, isActive = true): Promise<CourseEntity[]> {
    try {
      const courses = await prisma.course.findMany({
        where: { isActive },
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' }
      })
      return courses as CourseEntity[]
    } catch (error) {
      logger.error('Error finding all courses', error as Error, { limit, offset, isActive })
      throw error
    }
  }

  async create(data: CreateCourseRequest): Promise<CourseEntity> {
    try {
      const course = await prisma.course.create({
        data: {
          code: data.code,
          name: data.name,
          description: data.description,
          videoUrl: data.videoUrl,
          thumbnail: data.thumbnail,
          requirements: data.requirements,
          outcomes: data.outcomes,
          duration: data.duration,
          level: data.level,
          isActive: data.isActive ?? true,
        }
      })
      return course as CourseEntity
    } catch (error) {
      logger.error('Error creating course', error as Error, { data })
      throw error
    }
  }

  async update(id: string, data: UpdateCourseRequest): Promise<CourseEntity> {
    try {
      const course = await prisma.course.update({
        where: { id },
        data
      })
      return course as CourseEntity
    } catch (error) {
      logger.error('Error updating course', error as Error, { id, data })
      throw error
    }
  }

  async delete(id: string): Promise<CourseEntity> {
    try {
      const course = await prisma.course.delete({
        where: { id }
      })
      return course as CourseEntity
    } catch (error) {
      logger.error('Error deleting course', error as Error, { id })
      throw error
    }
  }

  async count(isActive = true): Promise<number> {
    try {
      return await prisma.course.count({
        where: { isActive }
      })
    } catch (error) {
      logger.error('Error counting courses', error as Error, { isActive })
      throw error
    }
  }

  // Enrollment methods
  async createEnrollment(data: CreateEnrollmentRequest): Promise<EnrollmentEntity> {
    try {
      const enrollment = await prisma.enrollment.create({
        data: {
          userId: data.userId,
          courseId: data.courseId,
        }
      })
      return enrollment
    } catch (error) {
      logger.error('Error creating enrollment', error as Error, { data })
      throw error
    }
  }

  async findEnrollment(userId: string, courseId: string): Promise<EnrollmentEntity | null> {
    try {
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId
          }
        }
      })
      return enrollment
    } catch (error) {
      logger.error('Error finding enrollment', error as Error, { userId, courseId })
      throw error
    }
  }

  async getUserEnrollments(userId: string): Promise<EnrollmentEntity[]> {
    try {
      const enrollments = await prisma.enrollment.findMany({
        where: { userId },
        include: {
          course: true
        },
        orderBy: { enrolledAt: 'desc' }
      })
      return enrollments
    } catch (error) {
      logger.error('Error finding user enrollments', error as Error, { userId })
      throw error
    }
  }

  async deleteEnrollment(userId: string, courseId: string): Promise<EnrollmentEntity> {
    try {
      const enrollment = await prisma.enrollment.delete({
        where: {
          userId_courseId: {
            userId,
            courseId
          }
        }
      })
      return enrollment
    } catch (error) {
      logger.error('Error deleting enrollment', error as Error, { userId, courseId })
      throw error
    }
  }
}
