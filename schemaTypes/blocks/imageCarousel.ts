import {defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export default defineType({
  name: 'imageCarousel',
  title: 'Image Carousel',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Heading for the image carousel section',
    },
    {
      name: 'images',
      title: 'Carousel Images',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'carouselImage',
          title: 'Carousel Image',
          fields: [
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
                  validation: (Rule) =>
                    Rule.required().error('Alt text is required for accessibility'),
                },
              ],
            },
            {
              name: 'captionTitle',
              title: 'Caption Title',
              type: 'string',
              description: 'Title for this image in the carousel',
            },
            {
              name: 'mainCaption',
              title: 'Main Caption',
              type: 'text',
              rows: 3,
              description: 'Main caption text for this image',
            },
          ],
          preview: {
            select: {
              title: 'captionTitle',
              subtitle: 'mainCaption',
              media: 'image',
            },
            prepare(selection) {
              const {title, subtitle, media} = selection
              return {
                title: title || 'Untitled carousel image',
                subtitle: subtitle
                  ? subtitle.slice(0, 50) + (subtitle.length > 50 ? '...' : '')
                  : 'No caption',
                media: media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('At least one image is required for the carousel'),
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      images: 'images',
    },
    prepare(selection) {
      const {heading, images} = selection
      const imageCount = images ? images.length : 0
      const title = heading || 'Image Carousel'

      return {
        title,
        subtitle: 'Image Carousel',
        media: ImagesIcon,
      }
    },
  },
})
