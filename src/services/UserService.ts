import { UserRepository } from '@/repositories/UserRepository'
import { UserEntity, UpdateUserRequest, UserProfile } from '@/types/User'
import { logger } from '@/lib/logger'

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async getUserById(id: string): Promise<UserEntity | null> {
    try {
      return await this.userRepository.findById(id)
    } catch (error) {
      logger.error('Error getting user by ID', error as Error, { id })
      throw error
    }
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    try {
      return await this.userRepository.findByEmail(email)
    } catch (error) {
      logger.error('Error getting user by email', error as Error, { email })
      throw error
    }
  }

  async updateUser(id: string, data: UpdateUserRequest): Promise<UserEntity> {
    try {
      // Validate user exists
      const existingUser = await this.userRepository.findById(id)
      if (!existingUser) {
        throw new Error('User not found')
      }

      return await this.userRepository.update(id, data)
    } catch (error) {
      logger.error('Error updating user', error as Error, { id, data })
      throw error
    }
  }

  async deleteUser(id: string): Promise<UserEntity> {
    try {
      // Validate user exists
      const existingUser = await this.userRepository.findById(id)
      if (!existingUser) {
        throw new Error('User not found')
      }

      return await this.userRepository.delete(id)
    } catch (error) {
      logger.error('Error deleting user', error as Error, { id })
      throw error
    }
  }

  async getUserProfile(id: string): Promise<UserProfile | null> {
    try {
      return await this.userRepository.getUserProfile(id)
    } catch (error) {
      logger.error('Error getting user profile', error as Error, { id })
      throw error
    }
  }

  async getAllUsers(limit = 10, offset = 0): Promise<UserEntity[]> {
    try {
      return await this.userRepository.findAll(limit, offset)
    } catch (error) {
      logger.error('Error getting all users', error as Error, { limit, offset })
      throw error
    }
  }

  async getUsersCount(): Promise<number> {
    try {
      return await this.userRepository.count()
    } catch (error) {
      logger.error('Error getting users count', error as Error)
      throw error
    }
  }
}
