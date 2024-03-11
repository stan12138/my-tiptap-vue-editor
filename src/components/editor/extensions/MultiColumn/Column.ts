import { Node, mergeAttributes } from '@tiptap/core'

export const Column = Node.create({
  name: 'column',

  content: 'block+',

  isolating: true,

  addAttributes() {
    return {
      position: {
        default: '',
        parseHTML: element => element.getAttribute('data-position'),
        renderHTML: attributes => ({ 'data-position': attributes.position }),
      },
    }
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'column' }), 0]
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="column"]',
      },
    ]
  },
  addCommands() {
    return {
      deleteColumns:
        () =>
        ({ commands }) =>
          console.log("delete")
    }
  },
  addKeyboardShortcuts() {
    return {
      // remove code block when at start of document or code block is empty
      Backspace: () => {
        const { empty, $anchor } = this.editor.state.selection
        // const isAtStart = $anchor.pos === 1
        const parent = $anchor.node($anchor.depth-1)
        // console.log("backspace", parent.childCount, parent.textContent, parent.firstChild.type.name)
        const childNum = parent.childCount
        const text = parent.textContent
        const childName = parent.firstChild.type.name
        console.log(childNum, text, childName)
        if(childNum == 1 && text == "" && childName == "paragraph") {
          
          let v = this.editor.commands.deleteNode(parent)
          console.log(v, parent)
        }
        // if (!empty || $anchor.parent.type.name !== this.name) {
        //   return false
        // }

        // if (isAtStart || !$anchor.parent.textContent.length) {
        //   return this.editor.commands.clearNodes()
        // }

        return false
      }
    }
  }
})

export default Column
