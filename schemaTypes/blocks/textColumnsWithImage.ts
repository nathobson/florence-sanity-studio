import {defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export default defineType({
  name: 'textColumnsWithImage',
  title: 'Text Columns with Image',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      description: 'Optional heading for the entire section',
    },
    {
      name: 'numberOfColumns',
      title: 'Number of Columns',
      type: 'number',
      description: 'The number of columns to display on desktop',
      initialValue: 3,
      options: {
        list: [1, 2, 3],
        layout: 'dropdown',
      },
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'heading',
              title: 'Item Heading',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Content',
              type: 'text',
              rows: 3,
              description: 'Text content for this item',
            },
          ],
          preview: {
            select: {
              title: 'heading',
              media: 'image',
            },
            prepare(selection) {
              const {title, media} = selection
              return {
                title: title || 'Untitled item',
                media: media ?? ImagesIcon,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('At least one item is required'),
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      items: 'items',
    },
    prepare(selection) {
      const {heading, items} = selection
      const itemCount = items?.length || 0
      const title = heading || `${itemCount} text columns with images`

      return {
        title: title || 'Currently no heading or items, add content to this block',
        subtitle: 'Text Columns with Image',
        media: ImagesIcon,
      }
    },
  },
})
