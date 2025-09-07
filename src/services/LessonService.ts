import { LessonRepository } from '@/repositories/LessonRepository'
import { LessonDataResponse } from '@/types/Course'
import { logger } from '@/lib/logger'

export class LessonService {
  private lessonRepository: LessonRepository

  constructor() {
    this.lessonRepository = new LessonRepository()
  }

  async getLessonData(lessonId: string): Promise<LessonDataResponse | null> {
    try {
      const result = await this.lessonRepository.findLessonWithContext(lessonId)
      if (!result) return null

      const { lesson, totalLessons, prevLessonId, nextLessonId, resources, completedPercent } = result

      const durationText = this.formatDuration(lesson.duration)

      return {
        courseId: lesson.courseId,
        courseTitle: lesson.course.title,
        sectionTitle: lesson.curriculumSection?.title,
        lessonId: lesson.id,
        title: lesson.title,
        description: lesson.description,
        duration: durationText,
        videoUrl: lesson.videoUrl,
        index: lesson.order,
        totalLessons,
        prevLessonId,
        nextLessonId,
        resources: resources
          .sort((a, b) => a.order - b.order)
          .map(r => ({ id: r.id, title: r.title, type: r.type, size: r.sizeText, url: r.url })),
        notes: lesson.notes ?? [],
        progressPercent: completedPercent,
      }
    } catch (error) {
      logger.error('Error getting lesson data', error as Error, { lessonId })
      throw error
    }
  }

  private formatDuration(duration: number): string {
    const hours = Math.floor(duration / 60)
    const remainingMinutes = duration % 60
    if (hours > 0 && remainingMinutes > 0) return `${hours}h ${remainingMinutes}m`
    if (hours > 0) return `${hours}h`
    return `${remainingMinutes}m`
  }
}


