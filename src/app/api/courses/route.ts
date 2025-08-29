import { NextRequest } from 'next/server'
import { CourseController } from '@/controllers/CourseController'

const courseController = new CourseController()

export async function GET(request: NextRequest) {
  return courseController.getAllCourses(request)
}

export async function POST(request: NextRequest) {
  return courseController.createCourse(request)
}

