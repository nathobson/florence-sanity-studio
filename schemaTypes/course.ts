import {defineField, defineType} from 'sanity'
import {pageBuilder} from './pageBuilder'
import {BookIcon} from '@sanity/icons'

export default defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  icon: () => '📚',
  fields: [
    defineField({
      name: 'title',
      title: 'Course Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Course title is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required for course URLs'),
    }),
    defineField({
      name: 'description',
      title: 'Course Description',
      type: 'text',
      rows: 4,
    }),
    {
      ...pageBuilder,
      name: 'content',
      title: 'Course Content',
      description: 'Use the page builder to create rich content for your course overview',
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare(selection) {
      const {title, slug} = selection
      return {
        title: title,
        media: BookIcon,
      }
    },
  },
  orderings: [
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
})
