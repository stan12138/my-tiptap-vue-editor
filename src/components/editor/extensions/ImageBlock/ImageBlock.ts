import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { mergeAttributes } from '@tiptap/core'
import { Image } from '../Image/Image.ts'
import ImageBlockView from './ImageBlockView.vue'

export const ImageBlock = Image.extend({
    name: 'imageBlock',
  
    group: 'block',
  
    defining: true,
  
    isolating: true,
  
    addAttributes() {
        return {
            src: {
                default: '',
                parseHTML: element => element.getAttribute('src'),
                renderHTML: attributes => ({
                    src: attributes.src,
                }),
            },
            width: {
                default: null,
                parseHTML: element => element.getAttribute('data-width'),
                renderHTML: attributes => ({
                    'data-width': attributes.width,
                }),
            },
            height: {
                default: null,
                parseHTML: element => element.getAttribute('data-height'),
                renderHTML: attributes => ({
                    'data-height': attributes.height,
                }),
            },
            align: {
                default: 'center',
                parseHTML: element => element.getAttribute('data-align'),
                renderHTML: attributes => ({
                    'data-align': attributes.align,
                }),
            },
            unLockRatio: {
                default: false,
                parseHTML: element => element.getAttribute('data-unlockratio'),
                renderHTML: attributes => ({
                    'data-unlockratio': attributes.unLockRatio,
                }),
            },
            alt: {
                default: undefined,
                parseHTML: element => element.getAttribute('alt'),
                renderHTML: attributes => ({
                    alt: attributes.alt,
                }),
            },
        }
    },
  
    parseHTML() {
      return [
        {
          tag: 'img',
        },
      ]
    },
  
    renderHTML({ HTMLAttributes }) {
      return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
    },
  
    addCommands() {
        return {
            getImageBlockSrc:
                attrs => 
                ({commands}) => {
                    console.log(attrs, commands)
                },
            updateImageBlockSrc:
                src => 
                ({ commands }) =>
                commands.updateAttributes('imageBlock', { src }),
            setImageBlock:
                attrs =>
                ({ commands }) => {
                    return commands.insertContent({ type: 'imageBlock', attrs: { src: attrs.src } })
                },
            setImageBlockAt:
                attrs =>
                ({ commands }) => {
                    return commands.insertContentAt(attrs.pos, { type: 'imageBlock', attrs: { src: attrs.src } })
                },
            setImageBlockAlign:
                align =>
                ({ commands }) =>
                    commands.updateAttributes('imageBlock', { align }),
            setImageBlockWidth:
                width =>
                ({ commands }) =>
                    commands.updateAttributes('imageBlock', { width: `${Math.max(0, Math.min(100, width))}%` }),
            setImageBlockLockRatio:
                ratioStatus =>
                ({ commands }) =>
                    commands.updateAttributes('imageBlock', { unLockRatio: ratioStatus }),
        }
    },
  
    addNodeView() {
      return VueNodeViewRenderer(ImageBlockView)
    },
  })
  
  export default ImageBlock