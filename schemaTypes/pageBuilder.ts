import {defineField} from 'sanity'
import {
  imageBlock,
  textBlock,
  numberedList,
  quote,
  textColumnsWithImage,
  video,
  audio,
} from './blocks'

export const pageBuilder = defineField({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'array',
  of: [imageBlock, textBlock, numberedList, quote, textColumnsWithImage, video, audio],
  options: {
    insertMenu: {
      groups: [
        {
          name: 'content',
          title: 'Content',
          of: ['textBlock', 'quote'],
        },
        {
          name: 'media',
          title: 'Media',
          of: ['imageBlock', 'video', 'audio'],
        },
        {
          name: 'layout',
          title: 'Layout',
          of: ['numberedList', 'textColumnsWithImage'],
        },
        {
          name: 'engagement',
          title: 'Engagement',
          of: ['quote', 'video', 'audio'],
        },
      ],
      views: [
        {name: 'list'},
        {
          name: 'grid',
          previewImageUrl: (schemaTypeName) => `/static/preview-${schemaTypeName}.png`,
        },
      ],
    },
  },
})
