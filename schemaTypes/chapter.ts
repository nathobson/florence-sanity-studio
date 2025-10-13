import {ALL_FIELDS_GROUP, defineField, defineType} from 'sanity'
import {orderRankField} from '@sanity/orderable-document-list'
import {pageBuilder} from './pageBuilder'
import {BookmarkIcon} from '@sanity/icons'

export default defineType({
  name: 'chapter',
  title: 'Chapter',
  type: 'document',
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
      hidden: true,
    }),
    defineField({
      name: 'content',
      title: ' ',
      type: 'object',
      groups: [
        {
          name: 'content',
          title: 'Content',
        },
        {
          name: 'aiContext',
          title: 'AI Context',
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
          title: 'Chapter Layout',
          group: 'content',
          validation: (Rule) => Rule.required().error('Chapter content is required'),
        },
        {
          name: 'learningObjective',
          title: 'Learning Objective',
          type: 'text',
          rows: 3,
          group: 'aiContext',
          description: 'What should students learn from this chapter?',
        },
        {
          name: 'context',
          title: 'Context',
          type: 'text',
          rows: 3,
          group: 'aiContext',
          description: 'Additional context / prompting',
        },
        {
          name: 'chatIntroText',
          title: 'Chat Introduction Text',
          type: 'text',
          rows: 3,
          group: 'aiContext',
          description: 'Shown at the start of the chat',
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
        media: BookmarkIcon,
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
