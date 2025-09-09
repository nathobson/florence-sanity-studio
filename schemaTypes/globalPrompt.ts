import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

export default defineType({
  name: 'globalPrompt',
  title: 'Global prompt',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'systemPrompt',
      title: 'System Prompt',
      type: 'text',
      rows: 30,
      description: 'Global system prompt for AI interactions',
      validation: (Rule) => Rule.required().error('System prompt is required'),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'System Prompts Configuration',
        subtitle: 'Global AI prompts settings',
        media: CogIcon,
      }
    },
  },
})
