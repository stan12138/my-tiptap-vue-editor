import { Editor } from '@tiptap/vue-3'
import { EditorState } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'

import { isTableSelected } from '../../utils'
import { MyTable } from '../../Table.ts'

export const isColumnGripSelected = (editor, view, state, from) => {
  const domAtPos = view.domAtPos(from).node as HTMLElement
  const nodeDOM = view.nodeDOM(from) as HTMLElement
  const node = nodeDOM || domAtPos

  if (!editor.isActive(MyTable.name) || !node || isTableSelected(state.selection)) {
    return false
  }

  let container = node

  while (container && !['TD', 'TH'].includes(container.tagName)) {
    container = container.parentElement!
  }

  const gripColumn = container && container.querySelector && container.querySelector('a.grip-column.selected')

  return !!gripColumn
}

export default isColumnGripSelected
