import type {Template} from 'sanity'

// Default chapter template (for creating chapters directly)
export const chapterTemplate: Template = {
  id: 'chapter',
  title: 'Chapter (No Course)',
  description: 'Create a new chapter without course assignment',
  schemaType: 'chapter',
  value: async (_: any, context: any) => {
    try {
      // Get the count of existing chapters to generate title
      const count = await context
        .getClient({apiVersion: '2024-01-01'})
        .fetch(`count(*[_type == "chapter"])`)
      return {
        title: `Chapter ${(count || 0) + 1}`,
      }
    } catch (error) {
      return {
        title: 'New Chapter',
      }
    }
  },
}

// Parameterized template for creating chapters from within a course context
export const chapterForCourseTemplate: Template = {
  id: 'chapter-for-course',
  title: 'New Chapter',
  description: 'Create a new chapter for this course',
  schemaType: 'chapter',
  parameters: [{name: 'courseId', title: 'Course ID', type: 'string'}],
  value: async (params: any, context: any) => {
    // Handle both single object and array format
    const courseId =
      params?.courseId ||
      params?.templateParams?.courseId ||
      (Array.isArray(params) && params[1]?.courseId) ||
      (params && params[1]?.courseId)

    if (courseId) {
      try {
        // Fetch the course to get additional data
        const course = await context
          .getClient({apiVersion: '2024-01-01'})
          .fetch(
            `*[_type == "course" && _id == $courseId][0]{_id, title, "chapterCount": count(*[_type == "chapter" && course._ref == ^._id])}`,
            {courseId: courseId},
          )

        const result = {
          course: {
            _type: 'reference',
            _ref: courseId,
          },
          // Auto-generate a title suggestion based on course chapter count
          title: `Chapter ${(course?.chapterCount || 0) + 1}`,
        }

        return result
      } catch (error) {
        const fallbackResult = {
          course: {
            _type: 'reference',
            _ref: courseId,
          },
          title: 'Chapter 1',
        }
        return fallbackResult
      }
    }

    return {
      title: 'New Chapter',
    }
  },
}

export const templates = [chapterForCourseTemplate]
