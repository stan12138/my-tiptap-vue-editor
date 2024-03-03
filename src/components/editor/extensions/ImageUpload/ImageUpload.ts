import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { Node } from '@tiptap/core'

import ImageUploadComponent from './ImageUploadComponent.vue'

export const ImageUpload = Node.create({
    name: 'imageUpload',
  
    isolating: true,
  
    defining: true,
  
    group: 'block',
  
    draggable: true,
  
    selectable: true,
  
    inline: false,
  
    parseHTML() {
      return [
        {
          tag: `div[data-type="${this.name}"]`,
        },
      ]
    },
  
    renderHTML() {
      return ['div', { 'data-type': this.name }]
    },
  
    addCommands() {
      return {
        setImageUpload:
          () =>
          ({ commands }) =>
            commands.insertContent(`<div data-type="${this.name}"></div><p></p>`),
      }
    },
  
    addNodeView() {
      return VueNodeViewRenderer(ImageUploadComponent)
    },
  })
  
  export default ImageUpload