<!-- 点击链接之后弹出的bubble menu -->
<template>
    <bubble-menu :tippyOptions="{onHidden: menuHide}" pluginKey="textMenu" :shouldShow="shouldShow" :editor="props.editor" style="padding: 0.35rem; border: 1px solid rgb(229, 229, 229); background-color: white; border-radius: 0.5rem">
        <LinkPreview v-if="!showEdit" :editor="props.editor" @edit-link="showEdit=true"></LinkPreview>
        <LinkEdit v-else :editor="props.editor" @submit="menuHide"></LinkEdit>
    </bubble-menu>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { BubbleMenu } from '@tiptap/vue-3'
import LinkEdit from './LinkEdit.vue'
import LinkPreview from './LinkPreview.vue'

import editorStatus from '../../utils/editorStatus.ts'

const props = defineProps(['editor'])

const shouldShow = ({view, from}) => {
    return props.editor.isActive('link') && editorStatus.isTextSelected(props.editor, from)
}

const showEdit = ref(false)

const menuHide = () => {
    showEdit.value = false
}

</script>

<style scoped>
:deep() .n-button {
    background-color: white;
}

/* Editor中的样式设置了所有按钮的背景色是白色，这里重新设置一下is-active保证is-active优先级最高，生效选中效果 */
:deep() .is-active {
    background-color: rgba(0, 0, 0, 0.1);
}
</style>