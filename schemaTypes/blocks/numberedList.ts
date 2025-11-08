import {defineType} from 'sanity'
import {OlistIcon} from '@sanity/icons'

export default defineType({
  name: 'numberedList',
  title: 'Numbered List',
  type: 'object',
  icon: OlistIcon,
  fields: [
    {
      name: 'style',
      title: 'Style',
      type: 'string',
      description: 'Controls the size of the numbers',
      initialValue: 'small',
      options: {
        list: ['small', 'large'],
        layout: 'dropdown',
      },
    },
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
              name: 'itemHeading',
              title: 'Heading',
              type: 'string',
            },
            {
              name: 'item',
              title: 'Item',
              type: 'string',
              validation: (Rule) => Rule.required().error('List item is required'),
            },
          ],
          preview: {
            select: {
              itemHeading: 'itemHeading',
              item: 'item',
            },
            prepare(selection) {
              const {itemHeading, item} = selection
              return {
                title: itemHeading || '',
                subtitle: item || 'No item content',
                media: OlistIcon,
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
      const title = heading || `${itemCount} numbered items`

      return {
        title: title || 'Currently no heading or items, add content to this block',
        subtitle: 'Numbered List',
        media: OlistIcon,
      }
    },
  },
})
