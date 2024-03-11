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

const shouldShow = ({view, from, state}) => {
    // shouldShow中一定要使用传入的state，因为用props.editor获取到的state会慢于实际的一步，导致判断失误！！！！
    // const resolvedPos = props.editor.state.selection.$from;
    // const node = resolvedPos.node();
    // const { state2 } = props.editor;
    // const resolvedPos = props.editor.state.doc.resolve(from);
    // console.log(from, state.selection.$from, state.selection.$from.marks());
    let marks = state.selection.$from.marks()
    if(marks.length > 0 && marks[0].type.name=='link') {
        return true
    }
    return false
    // return state.selection.$from.marks()
    // return props.editor.isActive('link') && editorStatus.isTextSelected(props.editor, from)
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