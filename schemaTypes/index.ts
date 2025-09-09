import course from './course'
import chapter from './chapter'
import prompts from './globalPrompt'
import {blockSchemas} from './blocks'

export const schemaTypes = [course, chapter, prompts, ...blockSchemas]
