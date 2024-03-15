import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { Node } from '@tiptap/core'
import { mergeAttributes } from '@tiptap/core'

import randomID from '../../utils/randomID'

import Map from './Map.vue'

export const MapBlock = Node.create({
    name: 'MapBlock',
  
    isolating: true,
  
    defining: true,
  
    group: 'block',
  
    draggable: true,
  
    selectable: true,
  
    inline: false,

    addAttributes() {
        return {
            center: {
                default: [],
                parseHTML: element => JSON.parse(element.getAttribute('data-center')),
                renderHTML: attributes => ({
                    'data-center': JSON.stringify(attributes.center),
                }),
            },
            zoom: {
                default: 10,
                parseHTML: element => element.getAttribute('data-zoom'),
                renderHTML: attributes => ({
                    'data-zoom': attributes.zoom,
                }),
            },
            markers: {
                default: {},
                parseHTML: element => JSON.parse(element.getAttribute('data-markers')),
                renderHTML: attributes => ({
                    'data-markers': JSON.stringify(attributes.markers),
                }),
            },
            dataType: {
                default: 'MapBlock',
                parseHTML: element => element.getAttribute('data-type'),
                renderHTML: attributes => ({
                    'data-type': attributes.dataType,
                }),
            },
            containerID: {
                default: '',
                parseHTML: element => element.getAttribute('data-containerID'),
                renderHTML: attributes => ({
                    'data-containerID': attributes.containerID,
                }),
            }
        }
    },
  
    parseHTML() {
      return [
        {
          tag: `div[data-type="${this.name}"]`,
        },
      ]
    },
  
    renderHTML({ HTMLAttributes }) {
      return ['div',mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
    },
  
    addCommands() {
      return {
        setMapBlock:
          () =>
          ({ commands }) =>
            commands.insertContent(`<div data-type="${this.name}"></div><p></p>`),
        updateCenter:
          center => 
          ({ commands }) => {
            commands.updateAttributes('MapBlock', { center })
            // const { state, dispatch } = this.editor.view
            // console.log(view)
            // const docEndPos = state.tr.doc.content.size;
            // const insertTransaction = state.tr.insertText(' ', docEndPos);
            // console.log("a")
            // dispatch(insertTransaction)
            // const newState = this.editor.view.state;
            // console.log(this)
            this.editor.view.
            // this.$emit('update')
            // 立即创建一个删除该文本节点的事务
            // const deleteTransaction = newState.tr.delete(docEndPos, docEndPos + 1);
            // console.log("b")
            // dispatch(deleteTransaction);
            // tr.setMeta('forceUpdate', true)
            // dispatch(state.tr)
            console.log("update center:", center)
          },
        updateZoom:
          zoom => 
          ({commands}) => {
            commands.updateAttributes('MapBlock', { zoom: zoom })
            console.log('going update zoom: ', zoom)
          },
        updateMarkers:
          newMarkers => 
          ({commands}) => {
            commands.updateAttributes('MapBlock', { markers: newMarkers })
            console.log('going update markers: ', newMarkers)
          }
      }
    },
  
    addNodeView() {
      return VueNodeViewRenderer(Map)
    },
  })
  
  export default MapBlock