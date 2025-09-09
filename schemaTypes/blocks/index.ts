import imageBlock from './imageBlock'
import textBlock from './textBlock'
import numberedList from './numberedList'
import quote from './quote'
import textColumnsWithImage from './textColumnsWithImage'
import video from './video'
import audio from './audio'

export const blockSchemas = [
  imageBlock,
  textBlock,
  numberedList,
  quote,
  textColumnsWithImage,
  video,
  audio,
]

export {imageBlock, textBlock, numberedList, quote, textColumnsWithImage, video, audio}
