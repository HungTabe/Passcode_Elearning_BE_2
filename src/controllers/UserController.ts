import { NextRequest, NextResponse } from 'next/server'
import { UserService } from '@/services/UserService'
import { UpdateUserRequest, UserEntity } from '@/types/User'
import { ApiResponse, SuccessResponse, ErrorResponse, PaginatedResponse } from '@/types/ApiResponse'
import { logger } from '@/lib/logger'
import { requireAuth } from '@/lib/auth'

export class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  async getProfile(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
      const user = await requireAuth(request)
      const profile = await this.userService.getUserProfile(user.id)
      
      if (!profile) {
        return NextResponse.json(
          { success: false, error: 'Profile not found' } as ErrorResponse,
          { status: 404 }
        )
      }

      const response: SuccessResponse<typeof profile> = {
        success: true,
        data: profile,
        message: 'Profile retrieved successfully'
      }

      return NextResponse.json(response)
    } catch (error) {
      logger.error('Get profile controller error', error as Error)
      
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' } as ErrorResponse,
          { status: 401 }
        )
      }

      const errorMessage = error instanceof Error ? error.message : 'Failed to get profile'
      const response: ErrorResponse = {
        success: false,
        error: errorMessage,
        statusCode: 500
      }

      return NextResponse.json(response, { status: 500 })
    }
  }

  async updateProfile(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
      const user = await requireAuth(request)
      const body: UpdateUserRequest = await request.json()
      
      const updatedUser = await this.userService.updateUser(user.id, body)
      
      const response: SuccessResponse<typeof updatedUser> = {
        success: true,
        data: updatedUser,
        message: 'Profile updated successfully'
      }

      return NextResponse.json(response)
    } catch (error) {
      logger.error('Update profile controller error', error as Error)
      
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' } as ErrorResponse,
          { status: 401 }
        )
      }

      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile'
      const response: ErrorResponse = {
        success: false,
        error: errorMessage,
        statusCode: 400
      }

      return NextResponse.json(response, { status: 400 })
    }
  }

  async getAllUsers(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
      await requireAuth(request) // Ensure user is authenticated
      
      const { searchParams } = new URL(request.url)
      const limit = parseInt(searchParams.get('limit') || '10')
      const offset = parseInt(searchParams.get('offset') || '0')
      
      const users = await this.userService.getAllUsers(limit, offset)
      const total = await this.userService.getUsersCount()
      
      const response: PaginatedResponse<UserEntity> = {
        success: true,
        data: users,
        message: 'Users retrieved successfully',
        pagination: {
          page: Math.floor(offset / limit) + 1,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }

      return NextResponse.json(response)
    } catch (error) {
      logger.error('Get all users controller error', error as Error)
      
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' } as ErrorResponse,
          { status: 401 }
        )
      }

      const errorMessage = error instanceof Error ? error.message : 'Failed to get users'
      const response: ErrorResponse = {
        success: false,
        error: errorMessage,
        statusCode: 500
      }

      return NextResponse.json(response, { status: 500 })
    }
  }

  async getUserById(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<ApiResponse>> {
    try {
      await requireAuth(request) // Ensure user is authenticated
      
      const user = await this.userService.getUserById(params.id)
      
      if (!user) {
        return NextResponse.json(
          { success: false, error: 'User not found' } as ErrorResponse,
          { status: 404 }
        )
      }

      const response: SuccessResponse<typeof user> = {
        success: true,
        data: user,
        message: 'User retrieved successfully'
      }

      return NextResponse.json(response)
    } catch (error) {
      logger.error('Get user by ID controller error', error as Error)
      
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' } as ErrorResponse,
          { status: 401 }
        )
      }

      const errorMessage = error instanceof Error ? error.message : 'Failed to get user'
      const response: ErrorResponse = {
        success: false,
        error: errorMessage,
        statusCode: 500
      }

      return NextResponse.json(response, { status: 500 })
    }
  }

  async deleteUser(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<ApiResponse>> {
    try {
      await requireAuth(request) // Ensure user is authenticated
      
      const deletedUser = await this.userService.deleteUser(params.id)
      
      const response: SuccessResponse<typeof deletedUser> = {
        success: true,
        data: deletedUser,
        message: 'User deleted successfully'
      }

      return NextResponse.json(response)
    } catch (error) {
      logger.error('Delete user controller error', error as Error)
      
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' } as ErrorResponse,
          { status: 401 }
        )
      }

      const errorMessage = error instanceof Error ? error.message : 'Failed to delete user'
      const response: ErrorResponse = {
        success: false,
        error: errorMessage,
        statusCode: 400
      }

      return NextResponse.json(response, { status: 400 })
    }
  }
}
