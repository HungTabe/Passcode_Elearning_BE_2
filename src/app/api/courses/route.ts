import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      where: { isActive: true },
      include: {
        lessons: {
          orderBy: { order: 'asc' }
        },
        _count: {
          select: { enrollments: true }
        }
      }
    })
    
    return NextResponse.json(courses)
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()
    const body = await request.json()
    
    const course = await prisma.course.create({
      data: body
    })
    
    return NextResponse.json(course)
  } catch (error) {
    console.error('Error creating course:', error)
    if (error instanceof Error) {
      if (error.message.includes('Unauthorized')) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
      if (error.message.includes('Forbidden')) {
        return NextResponse.json(
          { error: 'Forbidden' },
          { status: 403 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    )
  }
}

