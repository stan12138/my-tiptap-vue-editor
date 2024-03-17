import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'

export const MyCodeBlock = CodeBlockLowlight.extend({
    addCommands() {
        return {
          setCodeLang: (lang) => ({ commands }) => {
            return commands.updateAttributes('codeBlock', { language: lang })
          }
        }
    }
})

export default MyCodeBlock