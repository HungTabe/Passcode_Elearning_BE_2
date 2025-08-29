import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/services/AuthService'
import { LoginRequest, RegisterRequest } from '@/types/User'
import { ApiResponse, SuccessResponse, ErrorResponse } from '@/types/ApiResponse'
import { logger } from '@/lib/logger'

export class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  async login(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
      const body: LoginRequest = await request.json()
      
      // Validate required fields
      if (!body.email || !body.password) {
        return NextResponse.json(
          { success: false, error: 'Email and password are required' } as ErrorResponse,
          { status: 400 }
        )
      }

      const result = await this.authService.login(body)
      
      const response: SuccessResponse<typeof result> = {
        success: true,
        data: result,
        message: 'Login successful'
      }

      return NextResponse.json(response)
    } catch (error) {
      logger.error('Login controller error', error as Error)
      
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      const response: ErrorResponse = {
        success: false,
        error: errorMessage,
        statusCode: 401
      }

      return NextResponse.json(response, { status: 401 })
    }
  }

  async register(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
      const body: RegisterRequest = await request.json()
      
      // Validate required fields
      if (!body.email || !body.password || !body.name) {
        return NextResponse.json(
          { success: false, error: 'Email, password, and name are required' } as ErrorResponse,
          { status: 400 }
        )
      }

      const result = await this.authService.register(body)
      
      const response: SuccessResponse<typeof result> = {
        success: true,
        data: result,
        message: 'Registration successful'
      }

      return NextResponse.json(response)
    } catch (error) {
      logger.error('Register controller error', error as Error)
      
      const errorMessage = error instanceof Error ? error.message : 'Registration failed'
      const response: ErrorResponse = {
        success: false,
        error: errorMessage,
        statusCode: 400
      }

      return NextResponse.json(response, { status: 400 })
    }
  }

  async logout(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
      // In a real app, you would get the user ID from the JWT token
      const userId = 'placeholder-user-id' // This should come from JWT verification
      
      await this.authService.logout(userId)
      
      const response: SuccessResponse<null> = {
        success: true,
        data: null,
        message: 'Logout successful'
      }

      return NextResponse.json(response)
    } catch (error) {
      logger.error('Logout controller error', error as Error)
      
      const errorMessage = error instanceof Error ? error.message : 'Logout failed'
      const response: ErrorResponse = {
        success: false,
        error: errorMessage,
        statusCode: 500
      }

      return NextResponse.json(response, { status: 500 })
    }
  }

  async refreshToken(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
      const body = await request.json()
      const { refreshToken } = body
      
      if (!refreshToken) {
        return NextResponse.json(
          { success: false, error: 'Refresh token is required' } as ErrorResponse,
          { status: 400 }
        )
      }

      const result = await this.authService.refreshToken(refreshToken)
      
      const response: SuccessResponse<typeof result> = {
        success: true,
        data: result,
        message: 'Token refreshed successfully'
      }

      return NextResponse.json(response)
    } catch (error) {
      logger.error('Refresh token controller error', error as Error)
      
      const errorMessage = error instanceof Error ? error.message : 'Token refresh failed'
      const response: ErrorResponse = {
        success: false,
        error: errorMessage,
        statusCode: 401
      }

      return NextResponse.json(response, { status: 401 })
    }
  }
}
