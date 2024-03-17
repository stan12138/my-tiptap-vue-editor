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
            },
            frozen: {
                default: false,
                parseHTML: element => element.getAttribute('data-frozen'),
                renderHTML: attributes => ({
                    'data-frozen': attributes.frozen,
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
            commands.insertContent(`<div data-type="${this.name}"></div><p></p>`)
      }
    },
  
    addNodeView() {
      return VueNodeViewRenderer(Map)
    },
  })
  
  export default MapBlock