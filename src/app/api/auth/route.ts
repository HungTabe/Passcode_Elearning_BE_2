import { NextRequest } from 'next/server'
import { AuthController } from '@/controllers/AuthController'

const authController = new AuthController()

export async function POST(request: NextRequest) {
  const { pathname } = new URL(request.url)
  
  if (pathname === '/api/auth/login') {
    return authController.login(request)
  }
  
  if (pathname === '/api/auth/register') {
    return authController.register(request)
  }
  
  if (pathname === '/api/auth/logout') {
    return authController.logout(request)
  }
  
  if (pathname === '/api/auth/refresh') {
    return authController.refreshToken(request)
  }
  
  // Default case - return 404
  return new Response('Not Found', { status: 404 })
}
