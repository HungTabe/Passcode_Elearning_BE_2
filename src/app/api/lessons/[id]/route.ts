import { NextRequest, NextResponse } from 'next/server'
import { LessonController } from '@/controllers/LessonController'

const lessonController = new LessonController()


// CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_FE || '',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  }
  
  export async function OPTIONS() {
    return new NextResponse(null, { status: 200, headers: corsHeaders })
  }
  

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  const response = await lessonController.getLessonById(request, { params: resolvedParams })
  
  // Add CORS headers to response
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}


