import { CourseRepository } from '@/repositories/CourseRepository'
import { 
  CourseEntity, 
  CreateCourseRequest, 
  UpdateCourseRequest, 
  CourseWithDetails,
  CreateEnrollmentRequest,
  EnrollmentEntity,
  CourseDetailResponse
} from '@/types/Course'
import { logger } from '@/lib/logger'

export class CourseService {
  private courseRepository: CourseRepository

  constructor() {
    this.courseRepository = new CourseRepository()
  }

  async getCourseById(id: string): Promise<CourseEntity | null> {
    try {
      const course = await this.courseRepository.findById(id)
      if (!course) return null
      
      return {
        ...course,
        duration: this.formatDuration(course.duration as number)
      }
    } catch (error) {
      logger.error('Error getting course by ID', error as Error, { id })
      throw error
    }
  }

  async getCourseByCode(code: string): Promise<CourseEntity | null> {
    try {
      const course = await this.courseRepository.findByCode(code)
      if (!course) return null
      
      return {
        ...course,
        duration: this.formatDuration(course.duration as number)
      }
    } catch (error) {
      logger.error('Error getting course by code', error as Error, { code })
      throw error
    }
  }

  async getCourseWithDetails(id: string): Promise<CourseWithDetails | null> {
    try {
      const course = await this.courseRepository.findByIdWithDetails(id)
      if (!course) return null
      
      return {
        ...course,
        duration: this.formatDuration(course.duration as number)
      }
    } catch (error) {
      logger.error('Error getting course with details', error as Error, { id })
      throw error
    }
  }

  async getCourseDetail(id: string): Promise<CourseDetailResponse | null> {
    try {
      const course = await this.courseRepository.findByIdWithCurriculum(id)
      if (!course) return null
      
      return course
    } catch (error) {
      logger.error('Error getting course detail', error as Error, { id })
      throw error
    }
  }

  async getAllCourses(limit = 10, offset = 0, isActive = true): Promise<CourseEntity[]> {
    try {
      const courses = await this.courseRepository.findAll(limit, offset, isActive)
      // Format duration to string format (e.g., "8h")
      return courses.map(course => ({
        ...course,
        duration: this.formatDuration(course.duration)
      }))
    } catch (error) {
      logger.error('Error getting all courses', error as Error, { limit, offset, isActive })
      throw error
    }
  }

  private formatDuration(duration: number | string): string {
    // Nếu đã là string format rồi thì return luôn
    if (typeof duration === 'string') {
      return duration;
    }
    
    // Nếu là number thì format thành string
    const hours = Math.floor(duration / 60);
    const remainingMinutes = duration % 60;
    
    if (hours > 0 && remainingMinutes > 0) {
      return `${hours}h ${remainingMinutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${remainingMinutes}m`;
    }
  }

  async createCourse(data: CreateCourseRequest): Promise<CourseEntity> {
    try {
      // Validate course code is unique
      const existingCourse = await this.courseRepository.findByCode(data.code)
      if (existingCourse) {
        throw new Error('Course code already exists')
      }

      return await this.courseRepository.create(data)
    } catch (error) {
      logger.error('Error creating course', error as Error, { data })
      throw error
    }
  }

  async updateCourse(id: string, data: UpdateCourseRequest): Promise<CourseEntity> {
    try {
      // Validate course exists
      const existingCourse = await this.courseRepository.findById(id)
      if (!existingCourse) {
        throw new Error('Course not found')
      }

      // If updating code, check if new code is unique
      if (data.code && data.code !== existingCourse.code) {
        const courseWithNewCode = await this.courseRepository.findByCode(data.code)
        if (courseWithNewCode) {
          throw new Error('Course code already exists')
        }
      }

      return await this.courseRepository.update(id, data)
    } catch (error) {
      logger.error('Error updating course', error as Error, { id, data })
      throw error
    }
  }

  async deleteCourse(id: string): Promise<CourseEntity> {
    try {
      // Validate course exists
      const existingCourse = await this.courseRepository.findById(id)
      if (!existingCourse) {
        throw new Error('Course not found')
      }

      return await this.courseRepository.delete(id)
    } catch (error) {
      logger.error('Error deleting course', error as Error, { id })
      throw error
    }
  }

  async getCoursesCount(isActive = true): Promise<number> {
    try {
      return await this.courseRepository.count(isActive)
    } catch (error) {
      logger.error('Error getting courses count', error as Error, { isActive })
      throw error
    }
  }

  // Enrollment methods
  async enrollUser(data: CreateEnrollmentRequest): Promise<EnrollmentEntity> {
    try {
      // Check if user is already enrolled
      const existingEnrollment = await this.courseRepository.findEnrollment(data.userId, data.courseId)
      if (existingEnrollment) {
        throw new Error('User is already enrolled in this course')
      }

      // Validate course exists and is active
      const course = await this.courseRepository.findById(data.courseId)
      if (!course) {
        throw new Error('Course not found')
      }
      if (!course.isActive) {
        throw new Error('Course is not active')
      }

      return await this.courseRepository.createEnrollment(data)
    } catch (error) {
      logger.error('Error enrolling user', error as Error, { data })
      throw error
    }
  }

  async unenrollUser(userId: string, courseId: string): Promise<EnrollmentEntity> {
    try {
      // Check if enrollment exists
      const existingEnrollment = await this.courseRepository.findEnrollment(userId, courseId)
      if (!existingEnrollment) {
        throw new Error('User is not enrolled in this course')
      }

      return await this.courseRepository.deleteEnrollment(userId, courseId)
    } catch (error) {
      logger.error('Error unenrolling user', error as Error, { userId, courseId })
      throw error
    }
  }

  async getUserEnrollments(userId: string): Promise<EnrollmentEntity[]> {
    try {
      return await this.courseRepository.getUserEnrollments(userId)
    } catch (error) {
      logger.error('Error getting user enrollments', error as Error, { userId })
      throw error
    }
  }

  async checkUserEnrollment(userId: string, courseId: string): Promise<boolean> {
    try {
      const enrollment = await this.courseRepository.findEnrollment(userId, courseId)
      return !!enrollment
    } catch (error) {
      logger.error('Error checking user enrollment', error as Error, { userId, courseId })
      throw error
    }
  }
}
