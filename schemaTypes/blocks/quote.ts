import {defineType} from 'sanity'
import {BlockquoteIcon} from '@sanity/icons'

export default defineType({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  icon: BlockquoteIcon,
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('Image is required'),
    },
    {
      name: 'quoteText',
      title: 'Quote Text',
      type: 'text',
      rows: 3,
      description: 'The main quote content',
    },
    {
      name: 'quoteAttribution',
      title: 'Attribution',
      type: 'string',
      description: 'Who said this quote? (e.g., "John Doe, CEO of Company")',
    },
  ],
  preview: {
    select: {
      quoteText: 'quoteText',
      attribution: 'quoteAttribution',
      media: 'image',
    },
    prepare(selection) {
      const {quoteText, attribution, media} = selection
      const title = quoteText || 'Currently no quote text, add content to this block'
      const subtitle = attribution ? `— ${attribution}` : 'Quote'

      return {
        title,
        subtitle,
        media: media ?? BlockquoteIcon,
      }
    },
  },
})
