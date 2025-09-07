import { NextRequest, NextResponse } from 'next/server'
import { LessonService } from '@/services/LessonService'
import { ApiResponse, ErrorResponse, SuccessResponse } from '@/types/ApiResponse'
import { logger } from '@/lib/logger'

export class LessonController {
  private lessonService: LessonService

  constructor() {
    this.lessonService = new LessonService()
  }

  async getLessonById(
    request: NextRequest,
    { params }: { params: { id: string } }
  ): Promise<NextResponse<ApiResponse>> {
    try {
      const lesson = await this.lessonService.getLessonData(params.id)
      if (!lesson) {
        return NextResponse.json(
          { success: false, error: 'Lesson not found' } as ErrorResponse,
          { status: 404 }
        )
      }

      const response: SuccessResponse<typeof lesson> = {
        success: true,
        data: lesson,
        message: 'Lesson retrieved successfully'
      }
      return NextResponse.json(response)
    } catch (error) {
      logger.error('Get lesson by ID controller error', error as Error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to get lesson'
      const response: ErrorResponse = {
        success: false,
        error: errorMessage,
        statusCode: 500
      }
      return NextResponse.json(response, { status: 500 })
    }
  }
}


