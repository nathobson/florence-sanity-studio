import course from './course'
import chapter from './chapter'
import {globalPrompt} from './globalPrompt'
import {systemPrompts} from './systemPrompt'
import {blockSchemas} from './blocks'

export const schemaTypes = [course, chapter, globalPrompt, systemPrompts, ...blockSchemas]
