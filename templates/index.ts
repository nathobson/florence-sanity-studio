import type {Template} from 'sanity'

// Default chapter template (for creating chapters directly)
export const chapterTemplate: Template = {
  id: 'chapter',
  title: 'Chapter',
  description: 'Create a new chapter',
  schemaType: 'chapter',
  value: async (_, context) => {
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
  title: 'Chapter for Course',
  description: 'Create a new chapter for a specific course',
  schemaType: 'chapter',
  parameters: [{name: 'courseId', title: 'Course ID', type: 'string'}],
  value: async (params: {courseId?: string}, context) => {
    console.log('🚀 Chapter-for-course template called with params:', params)
    console.log('📄 Template context:', {
      hasGetClient: !!context.getClient,
      contextKeys: Object.keys(context),
    })

    if (params.courseId) {
      try {
        console.log('🔍 Fetching course data for:', params.courseId)

        // Fetch the course to get additional data
        const course = await context
          .getClient({apiVersion: '2024-01-01'})
          .fetch(
            `*[_type == "course" && _id == $courseId][0]{_id, title, "chapterCount": count(*[_type == "chapter" && course._ref == ^._id])}`,
            {courseId: params.courseId},
          )

        console.log('📊 Fetched course data:', course)

        const result = {
          course: {
            _type: 'reference',
            _ref: params.courseId,
          },
          // Auto-generate a title suggestion based on course chapter count
          title: `Chapter ${(course?.chapterCount || 0) + 1}`,
        }

        console.log('✅ Returning template result:', result)
        return result
      } catch (error) {
        console.error('❌ Error fetching course data:', error)
        const fallbackResult = {
          course: {
            _type: 'reference',
            _ref: params.courseId,
          },
          title: 'Chapter 1',
        }
        console.log('🔄 Using fallback result:', fallbackResult)
        return fallbackResult
      }
    }

    console.log('❌ No courseId provided')
    return {
      title: 'New Chapter',
    }
  },
}

export const templates = [chapterTemplate, chapterForCourseTemplate]
