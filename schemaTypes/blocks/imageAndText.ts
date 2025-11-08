import {defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export default defineType({
  name: 'imageAndText',
  title: 'Image and Text',
  type: 'object',
  icon: ImageIcon,
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading for this section',
    },
    {
      name: 'mainText',
      title: 'Main Text',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
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
      validation: (Rule) => Rule.required().error('Main text is required'),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('Image is required'),
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for accessibility',
          validation: (Rule) => Rule.required().error('Alt text is required for accessibility'),
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'Optional caption displayed below the image',
        },
      ],
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Image Left', value: 'imageLeft'},
          {title: 'Image Right', value: 'imageRight'},
          {title: 'Centred', value: 'centred'},
        ],
        layout: 'radio',
      },
      initialValue: 'imageLeft',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'imageSize',
      title: 'Image Size',
      type: 'string',
      options: {
        list: [
          {title: 'Small', value: 'small'},
          {title: 'Large', value: 'large'},
        ],
        layout: 'radio',
      },
      initialValue: 'small',
      validation: (Rule) => Rule.required(),
      description:
        'Small: 50/50 split for side layouts, centered for centred layout. Large: 3/4 image for side layouts, full width for centred layout.',
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      media: 'image',
      layout: 'layout',
      imageSize: 'imageSize',
    },
    prepare(selection) {
      const {heading, media, layout, imageSize} = selection
      const layoutLabel =
        layout === 'imageLeft' ? 'Left' : layout === 'imageRight' ? 'Right' : 'Centred'
      const sizeLabel = imageSize === 'small' ? 'Small' : 'Large'

      return {
        title: heading || 'Image and Text',
        subtitle: `Image ${layoutLabel} - ${sizeLabel}`,
        media: media ?? ImageIcon,
      }
    },
  },
})
