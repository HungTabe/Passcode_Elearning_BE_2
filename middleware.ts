import { NextRequest, NextResponse } from 'next/server'

// Simple middleware for CORS and basic auth (placeholder)
export function middleware(request: NextRequest) {
  // Add CORS headers
  const response = NextResponse.next()
  
  // Allow all origins for now (you can customize this)
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  return response
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};


