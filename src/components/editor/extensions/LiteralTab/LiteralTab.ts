// 编辑器不支持tab输入，这里强制处理一下
import { Extension } from '@tiptap/core';
export const LiteralTab = Extension.create({
    name: 'literalTab',

    addKeyboardShortcuts() {
        return {
            Tab: () => {
                return this.editor.chain().focus().insertContent({type: "text", text: '    '}).run()
            }
        }
    }

})

export default LiteralTab