import {defineType} from 'sanity'
import {MicrophoneIcon} from '@sanity/icons'

export default defineType({
  name: 'audio',
  title: 'Audio',
  type: 'object',
  icon: MicrophoneIcon,
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Listen to an audio on...',
      description: 'Heading for the audio section',
    },
    {
      name: 'intro',
      title: 'Introduction',
      type: 'text',
      rows: 3,
      description: 'Optional introduction text for the audio content',
    },
    {
      name: 'audioFile',
      title: 'Audio file',
      type: 'file',
      options: {
        accept: 'audio/*',
      },
      validation: (Rule) => Rule.required().error('Audio file is required'),
    },
    {
      name: 'audioCaptions',
      title: 'Audio captions file',
      description: 'Captions should be in .vtt format',
      type: 'file',
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      audioAsset: 'audioFile.asset',
    },
    prepare(selection) {
      const {heading, audioAsset} = selection
      const title =
        heading || (audioAsset ? 'Audio block' : 'Currently no audio, upload one to this block')

      return {
        title,
        subtitle: 'Audio',
        media: MicrophoneIcon,
      }
    },
  },
})
