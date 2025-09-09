import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {templates} from './templates'
import './custom.css'

export default defineConfig({
  name: 'default',
  title: 'Florence',

  projectId: 'o1ls2m2d',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates,
  },

  document: {
    // Ensure all default actions (including delete) are available
    actions: (prev, context) => {
      // Return all default actions for chapters
      if (context.schemaType === 'chapter') {
        return prev
      }
      return prev
    },
  },
})
