import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const user = await requireAuth()
    
    const progress = await prisma.lessonProgress.findMany({
      where: { userId: user.id },
      include: {
        lesson: {
          include: {
            course: true
          }
        }
      },
      orderBy: { watchedAt: 'desc' }
    })
    
    return NextResponse.json(progress)
  } catch (error) {
    console.error('Error fetching progress:', error)
    if (error instanceof Error) {
      if (error.message.includes('Unauthorized')) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const { lessonId, completed } = await request.json()
    
    if (!lessonId) {
      return NextResponse.json(
        { error: 'Lesson ID is required' },
        { status: 400 }
      )
    }
    
    // Check if lesson exists
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId }
    })
    
    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      )
    }
    
    // Check if user is enrolled in the course
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: lesson.courseId
        }
      }
    })
    
    if (!enrollment) {
      return NextResponse.json(
        { error: 'You must be enrolled in this course to track progress' },
        { status: 403 }
      )
    }
    
    // Update or create progress
    const progress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId: lessonId
        }
      },
      update: {
        completed: completed ?? true,
        watchedAt: new Date()
      },
      create: {
        userId: user.id,
        lessonId: lessonId,
        completed: completed ?? true,
        watchedAt: new Date()
      },
      include: {
        lesson: {
          include: {
            course: true
          }
        }
      }
    })
    
    return NextResponse.json(progress)
  } catch (error) {
    console.error('Error updating progress:', error)
    if (error instanceof Error) {
      if (error.message.includes('Unauthorized')) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    )
  }
}

