import {defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export default defineType({
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  icon: ImageIcon,
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('Image is required'),
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for accessibility',
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [{title: 'Normal', value: 'normal'}],
              lists: [],
              marks: {
                decorators: [
                  {title: 'Strong', value: 'strong'},
                  {title: 'Emphasis', value: 'em'},
                ],
                annotations: [
                  {
                    name: 'link',
                    type: 'object',
                    title: 'Link',
                    fields: [
                      {
                        name: 'href',
                        type: 'url',
                        title: 'URL',
                      },
                      {
                        title: 'Open in new tab',
                        name: 'blank',
                        type: 'boolean',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      alt: 'alt',
      media: 'image',
    },
    prepare(selection) {
      const {alt, media} = selection
      return {
        title: alt ?? 'Currently no alt text, set one for accessibility',
        subtitle: 'Image Block',
        media: media ?? ImageIcon,
      }
    },
  },
})
