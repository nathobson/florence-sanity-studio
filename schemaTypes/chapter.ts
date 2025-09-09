import {defineField, defineType} from 'sanity'
import {orderRankField} from '@sanity/orderable-document-list'

export default defineType({
  name: 'chapter',
  title: 'Chapter',
  type: 'document',
  icon: () => '📖',
  fields: [
    orderRankField({type: 'chapter'}),
    defineField({
      name: 'title',
      title: 'Chapter Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Chapter title is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required for chapter URLs'),
    }),
    defineField({
      name: 'course',
      title: 'Course',
      type: 'reference',
      to: [{type: 'course'}],
      validation: (Rule) => Rule.required().error('Chapter must belong to a course'),
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      courseTitle: 'course.title',
      courseSlug: 'course.slug.current',
      chapterSlug: 'slug.current',
    },
    prepare(selection) {
      const {title, courseTitle} = selection
      return {
        title: title,
        subtitle: courseTitle ? `Course: ${courseTitle}` : 'No course assigned',
        media: () => '📖',
      }
    },
  },
  orderings: [
    {
      title: 'Course and Order',
      name: 'courseAndOrder',
      by: [
        {field: 'course.title', direction: 'asc'},
        {field: 'orderRank', direction: 'asc'},
      ],
    },
    {
      title: 'Chapter Order',
      name: 'orderAsc',
      by: [{field: 'orderRank', direction: 'asc'}],
    },
  ],
})
