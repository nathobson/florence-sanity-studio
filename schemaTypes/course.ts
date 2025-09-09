import {ALL_FIELDS_GROUP, defineField, defineType} from 'sanity'
import {pageBuilder} from './pageBuilder'
import {BookIcon} from '@sanity/icons'

export default defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  icon: () => '📚',
  fields: [
    defineField({
      name: 'name',
      title: 'Course Name',
      type: 'string',
      validation: (Rule) => Rule.required().error('Course name is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required for course URLs'),
    }),
    defineField({
      name: 'content',
      title: ' ',
      type: 'object',
      groups: [
        {
          name: 'overview',
          title: 'Course overview',
        },
        {
          name: 'personalisation',
          title: 'Personalisation questions',
        },
        {
          name: 'chapters',
          title: 'Chapters',
        },
        {
          name: 'prompt',
          title: 'Prompt',
        },
        {
          ...ALL_FIELDS_GROUP,
          hidden: true,
        },
      ],
      fields: [
        {
          ...pageBuilder,
          name: 'layout',
          title: 'Layout',
          group: 'overview',
        },
        {
          name: 'personalisationQuestions',
          title: 'Personalisation Questions',
          type: 'array',
          group: 'personalisation',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'question',
                  title: 'Question',
                  type: 'string',
                  validation: (Rule) => Rule.required().error('Question is required'),
                },
              ],
              preview: {
                select: {
                  title: 'question',
                },
                prepare(selection) {
                  const {title} = selection
                  return {
                    title: title || 'Untitled question',
                  }
                },
              },
            },
          ],
        },
        {
          name: 'chapters',
          title: 'Course Chapters',
          type: 'array',
          group: 'chapters',
          of: [
            {
              type: 'reference',
              to: [{type: 'chapter'}],
            },
          ],
          options: {
            layout: 'list',
          },
        },
        {
          name: 'prompt',
          title: 'System Prompt',
          type: 'reference',
          group: 'prompt',
          to: [{type: 'systemPrompts'}],
          description: 'Select a system prompt to use for this course',
        },
      ],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      slug: 'slug.current',
    },
    prepare(selection) {
      const {name, slug} = selection
      return {
        title: name,
        media: BookIcon,
      }
    },
  },
  orderings: [
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
})
