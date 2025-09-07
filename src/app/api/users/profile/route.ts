import { NextRequest } from 'next/server'
import { UserController } from '@/controllers/UserController'

const userController = new UserController()

export async function GET(request: NextRequest) {
  return userController.getProfile(request)
}

export async function PUT(request: NextRequest) {
  return userController.updateProfile(request)
}
