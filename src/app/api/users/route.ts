import { NextRequest } from 'next/server'
import { UserController } from '@/controllers/UserController'

const userController = new UserController()

export async function GET(request: NextRequest) {
  return userController.getAllUsers(request)
}

export async function POST(request: NextRequest) {
  return userController.updateProfile(request)
}
