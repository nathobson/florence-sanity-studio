import {defineType} from 'sanity'
import {OlistIcon} from '@sanity/icons'

export default defineType({
  name: 'numberedList',
  title: 'Numbered List',
  type: 'object',
  icon: OlistIcon,
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Optional heading for the numbered list',
    },
    {
      name: 'items',
      title: 'List Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'item',
              title: 'Item',
              type: 'string',
              validation: (Rule) => Rule.required().error('List item is required'),
            },
          ],
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
      const title = heading || `${itemCount} numbered items`

      return {
        title: title || 'Currently no heading or items, add content to this block',
        subtitle: 'Numbered List',
        media: OlistIcon,
      }
    },
  },
})
