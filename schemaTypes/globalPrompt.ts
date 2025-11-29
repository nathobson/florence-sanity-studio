import {ALL_FIELDS_GROUP, defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

// Global settings singleton
export const globalPrompt = defineType({
  name: 'globalPrompt',
  title: 'Global Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      name: 'systemPrompt',
      title: 'System Prompt',
      default: true,
    },
    {
      name: 'landingPage',
      title: 'Landing Page',
    },
    {
      ...ALL_FIELDS_GROUP,
      hidden: true,
    },
  ],
  fields: [
    defineField({
      name: 'systemPrompt',
      title: 'Global System Prompt',
      type: 'text',
      rows: 30,
      group: 'systemPrompt',
      description: 'Global system prompt for AI interactions across the platform',
      validation: (Rule) => Rule.required().error('Global system prompt is required'),
    }),
    defineField({
      name: 'landingPageIntroText',
      title: 'Landing Page Intro Text',
      type: 'text',
      rows: 10,
      group: 'landingPage',
      description: 'Default welcome message shown in the chat on course landing pages. Can be overridden per course.',
      validation: (Rule) => Rule.required().error('Landing page intro text is required'),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Global Settings',
        subtitle: 'Platform-wide configuration',
        media: CogIcon,
      }
    },
  },
})
