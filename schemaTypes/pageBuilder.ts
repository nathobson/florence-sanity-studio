import {defineField} from 'sanity'
import {
  imageBlock,
  textBlock,
  numberedList,
  quote,
  textColumnsWithImage,
  video,
  audio,
  imageCarousel,
  iframeBlock,
  imageAndText,
} from './blocks'

export const pageBuilder = defineField({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'array',
  of: [
    imageBlock,
    textBlock,
    numberedList,
    quote,
    textColumnsWithImage,
    video,
    audio,
    imageCarousel,
    iframeBlock,
    imageAndText,
  ],
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
          of: ['imageBlock', 'video', 'audio', 'iframeBlock'],
        },
        {
          name: 'layout',
          title: 'Layout',
          of: ['numberedList', 'textColumnsWithImage', 'imageAndText'],
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
