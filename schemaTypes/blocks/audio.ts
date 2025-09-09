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
      placeholder: 'Listen to an audio on...',
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
      title: 'Audio File',
      type: 'file',
      options: {
        accept: 'audio/*',
      },
      validation: (Rule) => Rule.required().error('Audio file is required'),
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
        media: SpeakerIcon,
      }
    },
  },
})
