import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

export const systemPrompts = defineType({
  name: 'systemPrompts',
  title: 'System Prompt',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().error('Name is required'),
      description: 'A descriptive name for this prompt',
    }),
    defineField({
      name: 'systemPrompt',
      title: 'System Prompt',
      type: 'text',
      rows: 20,
      description: 'The system prompt content for AI interactions',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      systemPrompt: 'systemPrompt',
    },
    prepare(selection) {
      const {title, systemPrompt} = selection
      const snippet = systemPrompt ? systemPrompt.slice(0, 50) + '...' : 'No content'
      return {
        title: title || 'Untitled prompt',
        subtitle: snippet,
        media: CogIcon,
      }
    },
  },
})

export default systemPrompts
