import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  console.log('🔧 Middleware triggered for:', req.url)
  console.log('📋 Method:', req.method)
  console.log('🌐 Origin:', req.headers.get('origin'))
  console.log('📍 Pathname:', req.nextUrl.pathname)
  
  const res = NextResponse.next()

  // Get origin from request
  const origin = req.headers.get('origin')
  
  // Define allowed origins
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
  ]

  // Set CORS headers
  if (origin && allowedOrigins.includes(origin)) {
    res.headers.set('Access-Control-Allow-Origin', origin)
    console.log('✅ CORS Origin set to:', origin)
  } else {
    // Fallback for development
    res.headers.set('Access-Control-Allow-Origin', '*')
    console.log('⚠️ CORS Origin set to: * (fallback)')
  }
  
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin')
  res.headers.set('Access-Control-Allow-Credentials', 'true')
  res.headers.set('Access-Control-Max-Age', '86400') // 24 hours
  
  console.log('🔧 CORS headers set successfully')

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log('🔄 Handling OPTIONS preflight request')
    return new NextResponse(null, {
      status: 200,
      headers: res.headers,
    })
  }

  console.log('➡️ Returning response with CORS headers')
  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}


