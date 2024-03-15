import { mergeAttributes, Node, VueNodeViewRenderer } from '@tiptap/vue-3'

import PaperComponent from './PaperComponent.vue'

export default Node.create({
  name: 'paper',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      lines: {
        default: [],
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="paper"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'paper' })]
  },

  addNodeView() {
    return VueNodeViewRenderer(PaperComponent)
  },

  addCommands() {
    return {
      setPaper:
        () =>
        ({ commands }) =>
          commands.insertContent(`<div data-type="${this.name}"></div><p></p>`),
    }
  },
})