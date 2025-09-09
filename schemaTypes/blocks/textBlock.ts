import {defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'},
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
      validation: (Rule) => Rule.required().error('Content is required'),
    },
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare(selection) {
      const {content} = selection
      // Extract plain text from rich text for preview
      const block = (content || []).find((block: any) => block._type === 'block')
      const plainText =
        block?.children
          ?.filter((child: any) => child._type === 'span')
          ?.map((span: any) => span.text)
          ?.join('') || ''

      return {
        title: plainText || 'Currently no content, add some text to this block',
        subtitle: 'Text Block',
        media: DocumentTextIcon,
      }
    },
  },
})
