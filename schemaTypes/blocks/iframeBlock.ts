import {defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export default defineType({
  name: 'iframeBlock',
  title: 'Iframe Block',
  type: 'object',
  icon: LinkIcon,
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'An optional heading for the iframe',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) =>
        Rule.required()
          .uri({
            scheme: ['http', 'https'],
          })
          .error('A valid URL is required'),
    },
    {
      name: 'aspectRatioWidth',
      title: 'Aspect Ratio Width',
      type: 'number',
      initialValue: 16,
      validation: (Rule) =>
        Rule.required().positive().integer().error('Width must be a positive integer'),
      description: 'The width part of the aspect ratio (e.g., 16 for 16:9)',
    },
    {
      name: 'aspectRatioHeight',
      title: 'Aspect Ratio Height',
      type: 'number',
      initialValue: 9,
      validation: (Rule) =>
        Rule.required().positive().integer().error('Height must be a positive integer'),
      description: 'The height part of the aspect ratio (e.g., 9 for 16:9)',
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Contained', value: 'contained'},
          {title: 'Full Width', value: 'fullWidth'},
        ],
        layout: 'radio',
      },
      initialValue: 'contained',
      validation: (Rule) => Rule.required(),
      description: 'Contained: sits inside container with rounded corners. Full Width: spans entire page width without rounded corners.',
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption displayed below the iframe',
    },
  ],
  preview: {
    select: {
      url: 'url',
      heading: 'heading',
      aspectRatioWidth: 'aspectRatioWidth',
      aspectRatioHeight: 'aspectRatioHeight',
    },
    prepare(selection) {
      const {url, heading, aspectRatioWidth, aspectRatioHeight} = selection
      const title = heading || url || 'No URL set'
      const aspectRatio = `${aspectRatioWidth || 16}:${aspectRatioHeight || 9}`

      return {
        title,
        subtitle: `Iframe Block (${aspectRatio})`,
        media: LinkIcon,
      }
    },
  },
})

