import { NextRequest } from 'next/server'
import { UserController } from '@/controllers/UserController'

const userController = new UserController()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  return userController.getUserById(request, { params: resolvedParams })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  return userController.deleteUser(request, { params: resolvedParams })
}
