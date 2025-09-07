import { NextRequest, NextResponse } from 'next/server'
import { CourseService } from '@/services/CourseService'
import { CreateCourseRequest, UpdateCourseRequest, CreateEnrollmentRequest, CourseEntity, CourseDetailResponse } from '@/types/Course'
import { ApiResponse, SuccessResponse, ErrorResponse, PaginatedResponse } from '@/types/ApiResponse'
import { logger } from '@/lib/logger'
import { requireAuth, requireAdmin } from '@/lib/auth'

export class CourseController {
  private courseService: CourseService

  constructor() {
    this.courseService = new CourseService()
  }

  async getAllCourses(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
      const { searchParams } = new URL(request.url)
      const limit = parseInt(searchParams.get('limit') || '10')
      const offset = parseInt(searchParams.get('offset') || '0')
      const isActive = searchParams.get('isActive') !== 'false' // Default to true
      
      const courses = await this.courseService.getAllCourses(limit, offset, isActive)
      const total = await this.courseService.getCoursesCount(isActive)
      
      const response = {
        success: true,
        data: courses,
        message: 'Courses retrieved successfully',
        pagination: {
          page: Math.floor(offset / limit) + 1,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      } as PaginatedResponse<CourseEntity>

      return NextResponse.json(response)
    } catch (error) {
      logger.error('Get all courses controller error', error as Error)
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to get courses'
      const response: ErrorResponse = {
        success: false,
        error: errorMessage,
        statusCode: 500
      }

      return NextResponse.json(response, { status: 500 })
    }
  }

  async getCourseById(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<ApiResponse>> {
    try {
      const course = await this.courseService.getCourseById(params.id)
      
      if (!course) {
        return NextResponse.json(
          { success: false, error: 'Course not found' } as ErrorResponse,
          { status: 404 }
        )
      }

      const response: SuccessResponse<typeof course> = {
        success: true,
        data: course,
        message: 'Course retrieved successfully'
      }

      return NextResponse.json(response)
    } catch (error) {
      logger.error('Get course by ID controller error', error as Error)
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to get course'
      const response: ErrorResponse = {
        success: false,
        error: errorMessage,
        statusCode: 500
      }

      return NextResponse.json(response, { status: 500 })
    }
  }

  async getCourseWithDetails(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<ApiResponse>> {
    try {
      const course = await this.courseService.getCourseWithDetails(params.id)
      
      if (!course) {
        return NextResponse.json(
          { success: false, error: 'Course not found' } as ErrorResponse,
          { status: 404 }
        )
      }

      const response: SuccessResponse<typeof course> = {
        success: true,
        data: course,
        message: 'Course with details retrieved successfully'
      }

      return NextResponse.json(response)
    } catch (error) {
      logger.error('Get course with details controller error', error as Error)
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to get course details'
      const response: ErrorResponse = {
        success: false,
        error: errorMessage,
        statusCode: 500
      }

      return NextResponse.json(response, { status: 500 })
    }
  }

  async getCourseDetail(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<ApiResponse>> {
    try {
      const course = await this.courseService.getCourseDetail(params.id)
      
      if (!course) {
        return NextResponse.json(
          { success: false, error: 'Course not found' } as ErrorResponse,
          { status: 404 }
        )
      }

      const response: SuccessResponse<CourseDetailResponse> = {
        success: true,
        data: course,
        message: 'Course detail retrieved successfully'
      }

      return NextResponse.json(response)
    } catch (error) {
      logger.error('Get course detail controller error', error as Error)
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to get course detail'
      const response: ErrorResponse = {
        success: false,
        error: errorMessage,
        statusCode: 500
      }

      return NextResponse.json(response, { status: 500 })
    }
  }

  async createCourse(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
      await requireAdmin(request) // Only admins can create courses
      
      const body: CreateCourseRequest = await request.json()
      
      // Validate required fields
      if (!body.code || !body.name || !body.title || !body.description || !body.videoUrl || 
          !body.instructor || !body.category || !body.image || !body.previewUrl) {
        return NextResponse.json(
          { success: false, error: 'Code, name, title, description, videoUrl, instructor, category, image, and previewUrl are required' } as ErrorResponse,
          { status: 400 }
        )
      }

      const course = await this.courseService.createCourse(body)
      
      const response: SuccessResponse<typeof course> = {
        success: true,
        data: course,
        message: 'Course created successfully'
      }

      return NextResponse.json(response, { status: 201 })
    } catch (error) {
      logger.error('Create course controller error', error as Error)
      
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' } as ErrorResponse,
          { status: 401 }
        )
      }

      if (error instanceof Error && error.message.includes('Forbidden')) {
        return NextResponse.json(
          { success: false, error: 'Forbidden: Admin access required' } as ErrorResponse,
          { status: 403 }
        )
      }

      const errorMessage = error instanceof Error ? error.message : 'Failed to create course'
      const response: ErrorResponse = {
        success: false,
        error: errorMessage,
        statusCode: 400
      }

      return NextResponse.json(response, { status: 400 })
    }
  }

  async updateCourse(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<ApiResponse>> {
    try {
      await requireAdmin(request) // Only admins can update courses
      
      const body: UpdateCourseRequest = await request.json()
      
      const course = await this.courseService.updateCourse(params.id, body)
      
      const response: SuccessResponse<typeof course> = {
        success: true,
        data: course,
        message: 'Course updated successfully'
      }

      return NextResponse.json(response)
    } catch (error) {
      logger.error('Update course controller error', error as Error)
      
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' } as ErrorResponse,
          { status: 401 }
        )
      }

      if (error instanceof Error && error.message.includes('Forbidden')) {
        return NextResponse.json(
          { success: false, error: 'Forbidden: Admin access required' } as ErrorResponse,
          { status: 403 }
        )
      }

      const errorMessage = error instanceof Error ? error.message : 'Failed to update course'
      const response: ErrorResponse = {
        success: false,
        error: errorMessage,
        statusCode: 400
      }

      return NextResponse.json(response, { status: 400 })
    }
  }

  async deleteCourse(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<ApiResponse>> {
    try {
      await requireAdmin(request) // Only admins can delete courses
      
      const course = await this.courseService.deleteCourse(params.id)
      
      const response: SuccessResponse<typeof course> = {
        success: true,
        data: course,
        message: 'Course deleted successfully'
      }

      return NextResponse.json(response)
    } catch (error) {
      logger.error('Delete course controller error', error as Error)
      
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' } as ErrorResponse,
          { status: 401 }
        )
      }

      if (error instanceof Error && error.message.includes('Forbidden')) {
        return NextResponse.json(
          { success: false, error: 'Forbidden: Admin access required' } as ErrorResponse,
          { status: 403 }
        )
      }

      const errorMessage = error instanceof Error ? error.message : 'Failed to delete course'
      const response: ErrorResponse = {
        success: false,
        error: errorMessage,
        statusCode: 400
      }

      return NextResponse.json(response, { status: 400 })
    }
  }

  async enrollUser(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
      const user = await requireAuth(request)
      const body: CreateEnrollmentRequest = await request.json()
      
      // Ensure user can only enroll themselves
      if (body.userId !== user.id) {
        return NextResponse.json(
          { success: false, error: 'You can only enroll yourself' } as ErrorResponse,
          { status: 403 }
        )
      }

      const enrollment = await this.courseService.enrollUser(body)
      
      const response: SuccessResponse<typeof enrollment> = {
        success: true,
        data: enrollment,
        message: 'User enrolled successfully'
      }

      return NextResponse.json(response, { status: 201 })
    } catch (error) {
      logger.error('Enroll user controller error', error as Error)
      
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' } as ErrorResponse,
          { status: 401 }
        )
      }

      const errorMessage = error instanceof Error ? error.message : 'Failed to enroll user'
      const response: ErrorResponse = {
        success: false,
        error: errorMessage,
        statusCode: 400
      }

      return NextResponse.json(response, { status: 400 })
    }
  }

  async getUserEnrollments(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
      const user = await requireAuth(request)
      const enrollments = await this.courseService.getUserEnrollments(user.id)
      
      const response: SuccessResponse<typeof enrollments> = {
        success: true,
        data: enrollments,
        message: 'User enrollments retrieved successfully'
      }

      return NextResponse.json(response)
    } catch (error) {
      logger.error('Get user enrollments controller error', error as Error)
      
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' } as ErrorResponse,
          { status: 401 }
        )
      }

      const errorMessage = error instanceof Error ? error.message : 'Failed to get user enrollments'
      const response: ErrorResponse = {
        success: false,
        error: errorMessage,
        statusCode: 500
      }

      return NextResponse.json(response, { status: 500 })
    }
  }
}
