import { NextRequest } from 'next/server'
import { CourseController } from '@/controllers/CourseController'

const courseController = new CourseController()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  return courseController.getCourseById(request, { params: resolvedParams })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  return courseController.updateCourse(request, { params: resolvedParams })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  return courseController.deleteCourse(request, { params: resolvedParams })
}

