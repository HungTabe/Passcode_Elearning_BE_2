import { prisma } from '@/lib/db'
import { logger } from '@/lib/logger'
import { LessonEntity, LessonResourceEntity, LessonType } from '@/types/Course'

type LessonWithContext = LessonEntity & {
  course: { id: string; title: string }
  curriculumSection?: { id: string; title: string } | null
}

export class LessonRepository {
  async findLessonWithContext(lessonId: string): Promise<{
    lesson: LessonWithContext
    totalLessons: number
    prevLessonId?: string
    nextLessonId?: string
    resources: LessonResourceEntity[]
    completedPercent: number
  } | null> {
    try {
      const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
        include: {
          course: { select: { id: true, title: true } },
          curriculumSection: { select: { id: true, title: true } },
        }
      })
      if (!lesson) return null

      // Fetch resources via raw SQL to avoid client mismatch issues
      const resourcesRows = await prisma.$queryRawUnsafe<Array<{
        id: string
        lessonId: string
        title: string
        type: string
        sizeText: string | null
        url: string
        order: number
      }>>(
        'SELECT id, "lessonId", title, type, "sizeText", url, "order" FROM "lesson_resources" WHERE "lessonId" = $1 ORDER BY "order" ASC',
        lessonId
      )
      const resources: LessonResourceEntity[] = resourcesRows.map(r => ({
        id: r.id,
        lessonId: r.lessonId,
        title: r.title,
        type: r.type,
        sizeText: r.sizeText ?? undefined,
        url: r.url,
        order: r.order,
        // createdAt/updatedAt not selected; they are not required for API mapping
        createdAt: new Date(),
        updatedAt: new Date()
      }))

      // Calculate neighbors within the same course ordered by `order`
      const neighbors = await prisma.lesson.findMany({
        where: { courseId: lesson.courseId },
        select: { id: true, order: true },
        orderBy: { order: 'asc' }
      })
      const totalLessons = neighbors.length
      const indexInCourse = neighbors.findIndex(l => l.id === lesson.id)
      const prevLessonId = indexInCourse > 0 ? neighbors[indexInCourse - 1].id : undefined
      const nextLessonId = indexInCourse < neighbors.length - 1 ? neighbors[indexInCourse + 1].id : undefined

      // Progress percent: based on order position among all lessons in course
      const completedPercent = totalLessons > 0 ? Math.round(((indexInCourse + 1) / totalLessons) * 100) : 0

      return {
        lesson: {
          id: lesson.id,
          courseId: lesson.courseId,
          curriculumSectionId: lesson.curriculumSectionId,
          title: lesson.title,
          description: (lesson as unknown as { description?: string | null }).description ?? undefined,
          content: lesson.content,
          videoUrl: lesson.videoUrl,
          duration: lesson.duration,
          order: lesson.order,
          type: LessonType.VIDEO,
          notes: (lesson as unknown as { notes?: string[] | null }).notes ?? [],
          createdAt: lesson.createdAt,
          updatedAt: lesson.updatedAt,
          course: lesson.course,
          curriculumSection: lesson.curriculumSection,
        },
        totalLessons,
        prevLessonId,
        nextLessonId,
        resources,
        completedPercent,
      }
    } catch (error) {
      logger.error('Error fetching lesson with context', error as Error, { lessonId })
      throw error
    }
  }
}


