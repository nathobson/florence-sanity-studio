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
      description:
        '⚠️ Important: Select the course this chapter belongs to. If creating from a course page, this should be pre-filled.',
    }),
    defineField({
      name: 'description',
      title: 'Chapter Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'content',
      title: 'Chapter Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [{title: 'Bullet', value: 'bullet'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
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
