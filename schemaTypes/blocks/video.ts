import {defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons'

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'object',
  icon: PlayIcon,
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'An optional heading for the video',
    },
    {
      name: 'video',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      validation: (Rule) => Rule.required().error('Video file is required'),
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption displayed below the video',
    },
  ],
  preview: {
    select: {
      caption: 'caption',
      videoAsset: 'video.asset',
    },
    prepare(selection) {
      const {caption, videoAsset} = selection
      const title =
        caption || (videoAsset ? 'Video block' : 'Currently no video, upload one to this block')

      return {
        title,
        subtitle: 'Video',
        media: PlayIcon,
      }
    },
  },
})
