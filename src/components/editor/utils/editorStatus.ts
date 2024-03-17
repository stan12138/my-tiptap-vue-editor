import { Editor } from '@tiptap/vue-3'
import { isTextSelection } from '@tiptap/core'

export const isSelectCustomNode = (editor: Editor) => {
    const customNodes = [
        "link", "imageUpload", 'imageBlock', 'columns', 'column',  "MapBlock", "paper", "codeBlock"
    ]
    if(editor.state.selection.$anchor.parent.type.name == 'tableCell') return true;
    // console.log(editor)

    return customNodes.some(type => editor.isActive(type))
}

export const isTextSelected = (editor: Editor, comeFrom: number, checkNoSelect = true) => {
    const {
      state: {
        doc,
        selection,
        selection: { empty, from, to },
      },
    } = editor

    // 有发现选中之后，点击依旧弹出bubble menu的问题，此处处理一下
    if(checkNoSelect && (comeFrom != from)) {
        return false
    }
    // Sometime check for `empty` is not enough.
    // Doubleclick an empty paragraph returns a node size of 2.
    // So we check also for an empty text size.
    const isEmptyTextBlock = !doc.textBetween(from, to).length && isTextSelection(selection)
  
    if (empty || isEmptyTextBlock || !editor.isEditable) {
      return false
    }
  
    return true
  }


export default {isSelectCustomNode, isTextSelected};