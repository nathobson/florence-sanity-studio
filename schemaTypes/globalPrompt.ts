import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

// Global system prompt singleton
export const globalPrompt = defineType({
  name: 'globalPrompt',
  title: 'Global System Prompt',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'systemPrompt',
      title: 'Global System Prompt',
      type: 'text',
      rows: 30,
      description: 'Global system prompt for AI interactions across the platform',
      validation: (Rule) => Rule.required().error('Global system prompt is required'),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Global System Prompt',
        subtitle: 'Platform-wide AI prompt configuration',
        media: CogIcon,
      }
    },
  },
})
