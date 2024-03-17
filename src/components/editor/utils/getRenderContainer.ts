import { Editor } from '@tiptap/vue-3'
// 临时兼容一下codeBlock
export const getRenderContainer = (editor: Editor, nodeType: string, isCode=false) => {
  const {
    view,
    state: {
      selection: { from },
    },
  } = editor

  const elements = document.querySelectorAll('.has-focus')
  const elementCount = elements.length
  const innermostNode = elements[elementCount - 1]
  const element = innermostNode
  if(isCode) {
    let tagName = element.tagName
    if(tagName == 'PRE' && element.firstElementChild?.tagName=='CODE') return element;
    // console.log(tagName, element.firstElementChild)
  }
  if (
    (element && element.getAttribute('data-type') && element.getAttribute('data-type') === nodeType) ||
    (element && element.classList && element.classList.contains(nodeType))
  ) {
    return element
  }

  const node = view.domAtPos(from).node as HTMLElement
  let container = node

  if (!container.tagName) {
    container = node.parentElement
  }

  while (
    container &&
    !(container.getAttribute('data-type') && container.getAttribute('data-type') === nodeType) &&
    !container.classList.contains(nodeType)
  ) {
    container = container.parentElement
  }

  return container
}

export default getRenderContainer
