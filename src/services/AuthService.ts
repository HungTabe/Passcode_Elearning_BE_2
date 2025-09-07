import { UserRepository } from '@/repositories/UserRepository'
import { UserEntity, LoginRequest, RegisterRequest, AuthResponse, CreateUserRequest } from '@/types/User'
import { generateJWT } from '@/lib/auth'
import { logger } from '@/lib/logger'
import { Role } from '@prisma/client'

export class AuthService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      // Find user by email
      const user = await this.userRepository.findByEmail(credentials.email)
      if (!user) {
        throw new Error('Invalid credentials')
      }

      // In a real app, you would verify password here
      // For now, we'll assume the user exists and is valid
      
      // Generate JWT tokens
      const token = generateJWT({ userId: user.id, email: user.email })
      const refreshToken = generateJWT({ userId: user.id, type: 'refresh' })

      logger.info('User logged in successfully', { userId: user.id, email: user.email })

      return {
        user,
        token,
        refreshToken
      }
    } catch (error) {
      logger.error('Login failed', error as Error, { email: credentials.email })
      throw error
    }
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findByEmail(userData.email)
      if (existingUser) {
        throw new Error('User already exists')
      }

      // Create new user
      const createUserData: CreateUserRequest = {
        clerkId: `clerk_${Date.now()}`, // In real app, this would come from Clerk
        email: userData.email,
        name: userData.name,
        role: Role.STUDENT
      }

      const user = await this.userRepository.create(createUserData)

      // Generate JWT tokens
      const token = generateJWT({ userId: user.id, email: user.email })
      const refreshToken = generateJWT({ userId: user.id, type: 'refresh' })

      logger.info('User registered successfully', { userId: user.id, email: user.email })

      return {
        user,
        token,
        refreshToken
      }
    } catch (error) {
      logger.error('Registration failed', error as Error, { email: userData.email })
      throw error
    }
  }

  async refreshToken(_refreshToken: string): Promise<AuthResponse> {
    try {
      // In a real app, you would verify the refresh token here
      // For now, we'll return a placeholder
      throw new Error('Refresh token functionality not implemented')
    } catch (error) {
      logger.error('Token refresh failed', error as Error)
      throw error
    }
  }

  async logout(userId: string): Promise<void> {
    try {
      // In a real app, you might want to invalidate the token
      // or add it to a blacklist
      logger.info('User logged out', { userId })
    } catch (error) {
      logger.error('Logout failed', error as Error, { userId })
      throw error
    }
  }

  async getCurrentUser(userId: string): Promise<UserEntity | null> {
    try {
      return await this.userRepository.findById(userId)
    } catch (error) {
      logger.error('Error getting current user', error as Error, { userId })
      throw error
    }
  }
}
