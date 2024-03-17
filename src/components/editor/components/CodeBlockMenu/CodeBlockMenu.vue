<!-- 点击CodeBlock之后弹出的menu -->
<template>
    <bubble-menu :tippyOptions="tippyOptions" pluginKey="codeBlockMenu" :shouldShow="shouldShow" :editor="props.editor" style="padding: 0.35rem; background-color: white; border-radius: 0.5rem; box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.25);">
        <input v-model="lang" type="text" placeholder="code language" @keyup="changeLang"></input>
    </bubble-menu>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { BubbleMenu } from '@tiptap/vue-3'
import getRenderContainer from '../../utils/getRenderContainer.ts'

const props = defineProps(['editor'])

const lang = ref(props.editor.getAttributes('codeBlock').language)

const shouldShow = ({view, from}) => {
    if(!props.editor.isEditable) return false;
    // console.log(view.state?.selection?.node?.type?.name, from, view)
    // 此处直接检查isActive会有一次错误出现menu
    // console.log(props.editor.isActive('codeBlock'))
    if(props.editor.isActive('codeBlock')) {
        return true;
    }
    return false;

}

const changeLang = (event) => {
    if(event.keyCode == 13) {
        // console.log(lang.value, props.editor.chain().focus())
        props.editor.chain().focus().setCodeLang(lang.value).run()
    }
}

const getReferenceClientRect = () => {
    const renderContainer = getRenderContainer(props.editor, 'codeBlock', true)
    const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0)
    return rect
}

const tippyOptions = ref({
    'maxWidth': 'auto',
    'zIndex': 20,
    'appendTo': 'parent',
    "popperOptions": {
        'modifiers': [{ 'name': 'flip', 'enabled': false }],
    },
    "getReferenceClientRect": getReferenceClientRect, //用于始终固定menu的位置
})


</script>

<style scoped>
:deep() input {
    border: unset;
    margin-left: 10px;
}

:deep() input:focus {
    border: unset;
    outline: unset;
}
</style>