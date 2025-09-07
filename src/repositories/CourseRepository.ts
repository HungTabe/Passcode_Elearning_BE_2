import { prisma } from '@/lib/db'
import { 
  CourseEntity, 
  CreateCourseRequest, 
  UpdateCourseRequest, 
  CourseWithDetails,
  CreateEnrollmentRequest,
  EnrollmentEntity,
  CourseDetailResponse,
  LessonEntity,
  LessonType
} from '@/types/Course'
import { logger } from '@/lib/logger'

export class CourseRepository {
  async findById(id: string): Promise<CourseEntity | null> {
    try {
      const course = await prisma.course.findUnique({
        where: { id }
      })
      if (!course) return null
      
      return {
        ...course,
        lessons: (course as { lessonsCount?: number }).lessonsCount || 0
      } as CourseEntity
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
      if (!course) return null
      
      return {
        ...course,
        lessons: (course as { lessonsCount?: number }).lessonsCount || 0
      } as CourseEntity
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
      
      // Map lessons to include default type for backward compatibility
      const mappedLessons: LessonEntity[] = course.lessons.map(lesson => ({
        ...lesson,
        // Defaults for fields possibly missing in current Prisma client typings
        description: (lesson as unknown as { description?: string | null }).description ?? undefined,
        notes: (lesson as unknown as { notes?: string[] | null }).notes ?? [],
        type: LessonType.VIDEO // Temporary until Prisma client is regenerated
      }))
      
      return {
        ...course,
        enrollmentsCount: course._count.enrollments,
        lessons: mappedLessons
      } as CourseWithDetails
    } catch (error) {
      logger.error('Error finding course with details', error as Error, { id })
      throw error
    }
  }

  async findByIdWithCurriculum(id: string): Promise<CourseDetailResponse | null> {
    try {
      // For now, use the existing structure until Prisma client is regenerated
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
      
      // Create mock curriculum structure from existing lessons
      const curriculumSections = this.createMockCurriculum(course.lessons)
      
      return {
        id: course.id,
        title: course.title,
        instructor: course.instructor,
        rating: course.rating,
        students: course.students,
        duration: this.formatDuration(course.duration),
        lessons: course.lessonsCount,
        level: this.formatLevel(course.level),
        description: course.description,
        price: course.price,
        originalPrice: (course as { originalPrice?: number | null }).originalPrice ?? undefined,
        image: course.image,
        videoUrl: course.videoUrl,
        curriculum: curriculumSections,
        requirements: course.requirements,
        outcomes: course.outcomes
      } as CourseDetailResponse
    } catch (error) {
      logger.error('Error finding course with curriculum', error as Error, { id })
      throw error
    }
  }

  private createMockCurriculum(lessons: Array<{id: string, title: string, duration: number}>): Array<{id: string, title: string, lessons: Array<{id: string, title: string, duration: string, type: string}>}> {
    // Group lessons into sections (for now, create one section with all lessons)
    if (lessons.length === 0) return []
    
    return [{
      id: 'section-1',
      title: 'Course Content',
      lessons: lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        duration: this.formatDuration(lesson.duration),
        type: 'video' // Default type
      }))
    }]
  }

  private formatDuration(duration: number): string {
    const hours = Math.floor(duration / 60)
    const remainingMinutes = duration % 60
    
    if (hours > 0 && remainingMinutes > 0) {
      return `${hours}h ${remainingMinutes}m`
    } else if (hours > 0) {
      return `${hours}h`
    } else {
      return `${remainingMinutes}m`
    }
  }

  private formatLevel(level: string): string {
    switch (level) {
      case 'BEGINNER':
        return 'Beginner'
      case 'INTERMEDIATE':
        return 'Intermediate'
      case 'ADVANCED':
        return 'Advanced'
      default:
        return 'Beginner to Advanced'
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
      return courses.map(course => ({
        ...course,
        lessons: (course as { lessonsCount?: number }).lessonsCount || 0
      })) as CourseEntity[]
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
          title: data.title,
          description: data.description,
          videoUrl: data.videoUrl,
          thumbnail: data.thumbnail,
          requirements: data.requirements,
          outcomes: data.outcomes,
          duration: data.duration,
          level: data.level,
          isActive: data.isActive ?? true,
          // Enhanced course information
          instructor: data.instructor,
          rating: data.rating ?? 0.0,
          students: data.students ?? 0,
          lessonsCount: data.lessons ?? 0,
          category: data.category,
          price: data.price,
          // originalPrice: data.originalPrice, // Comment out until Prisma client is regenerated
          image: data.image,
          previewUrl: data.previewUrl,
        } as Parameters<typeof prisma.course.create>[0]['data']
      })
      return {
        ...course,
        lessons: (course as { lessonsCount?: number }).lessonsCount || 0
      } as CourseEntity
    } catch (error) {
      logger.error('Error creating course', error as Error, { data })
      throw error
    }
  }

  async update(id: string, data: UpdateCourseRequest): Promise<CourseEntity> {
    try {
      const updateData: Record<string, unknown> = { ...data }
      if (data.lessons !== undefined) {
        updateData.lessonsCount = data.lessons
        delete updateData.lessons
      }
      
      const course = await prisma.course.update({
        where: { id },
        data: updateData as Parameters<typeof prisma.course.update>[0]['data']
      })
      return {
        ...course,
        lessons: (course as { lessonsCount?: number }).lessonsCount || 0
      } as CourseEntity
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
      return {
        ...course,
        lessons: (course as { lessonsCount?: number }).lessonsCount || 0
      } as CourseEntity
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
