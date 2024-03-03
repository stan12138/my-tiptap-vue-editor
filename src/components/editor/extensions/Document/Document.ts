import { Document as TiptapDocument } from '@tiptap/extension-document'

export const Document = TiptapDocument.extend({
    content: 'heading block* (block|columns)+',    // fuck!!!! 自定义的columns扩展的必须在这里的content有columns才行
    // heading block*实现首行强制标题
})

export default Document