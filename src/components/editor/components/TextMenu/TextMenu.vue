<!-- 选中文字之后弹出的bubble menu -->
<template>
    <bubble-menu :shouldShow="shouldShow" :editor="props.editor" style="padding: 0.35rem; border: 1px solid rgb(229, 229, 229); background-color: white; border-radius: 0.5rem">
        <ContentTypePicker :editor="props.editor"></ContentTypePicker>
        <FontPicker :editor="props.editor"></FontPicker>
        <FontSizePicker :editor="props.editor"></FontSizePicker>
        <n-divider vertical style="margin: 0;"></n-divider>
        <n-button strong secondary style="vertical-align: middle; padding-left: 6px; padding-right: 6px; margin-left: 1px; margin-right: 1px;" :class="{'is-active': props.editor.isActive('bold')}" @click="props.editor.chain().focus().toggleBold().run()">
            <template #icon>
                <n-icon><Bold /></n-icon>
            </template>
        </n-button>
        <n-button strong secondary style="vertical-align: middle; padding-left: 6px; padding-right: 6px; margin-left: 1px; margin-right: 1px;" :class="{'is-active': props.editor.isActive('italic')}" @click="props.editor.chain().focus().toggleItalic().run()">
            <template #icon>
                <n-icon><Italic /></n-icon>
            </template>
        </n-button>
        <n-button strong secondary style="vertical-align: middle; padding-left: 6px; padding-right: 6px; margin-left: 1px; margin-right: 1px;" :class="{'is-active': props.editor.isActive('underline')}" @click="props.editor.chain().focus().toggleUnderline().run()">
            <template #icon>
                <n-icon><Underline /></n-icon>
            </template>
        </n-button>
        <n-button strong secondary style="vertical-align: middle; padding-left: 6px; padding-right: 6px; margin-left: 1px; margin-right: 1px;" :class="{'is-active': props.editor.isActive('strike')}" @click="props.editor.chain().focus().toggleStrike().run()">
            <template #icon>
                <n-icon><Strikethrough /></n-icon>
            </template>
        </n-button>
        <n-button strong secondary style="vertical-align: middle; padding-left: 6px; padding-right: 6px; margin-left: 1px; margin-right: 1px;" :class="{'is-active': props.editor.isActive('code')}" @click="props.editor.chain().focus().toggleCode().run()">
            <template #icon>
                <n-icon><Code/></n-icon>
            </template>
        </n-button>
        <n-button strong secondary style="vertical-align: middle; padding-left: 6px; padding-right: 6px; margin-left: 1px; margin-right: 1px;" @click="props.editor.chain().focus().toggleCodeBlock().run()">
            <template #icon>
                <n-icon><CodeSlash/></n-icon>
            </template>
        </n-button>
        <AddLink :editor="props.editor"></AddLink>
        <HighlightButton :editor="props.editor"></HighlightButton>
        <FontColor :editor="props.editor"></FontColor>
        <MoreOptions :editor="props.editor"></MoreOptions>
    </bubble-menu>
</template>
<script setup lang="ts">
import { Bold, Italic, Underline, Strikethrough, Highlight, Palette, Book } from '@vicons/tabler'
import { Code, CodeSlash } from '@vicons/ionicons5'
import { BubbleMenu } from '@tiptap/vue-3'
import ContentTypePicker from './ContentTypePicker.vue';
import FontPicker from './FontPicker.vue'
import FontSizePicker from './FontSizePicker.vue'
import AddLink from './AddLink.vue'
import HighlightButton from './HighlightButton.vue'
import FontColor from './FontColor.vue'
import MoreOptions from './MoreOptions.vue'

import editorStatus from '../../utils/editorStatus.ts'

const props = defineProps(['editor'])

const shouldShow = ({view, from}) => {
    if(editorStatus.isSelectCustomNode(props.editor)) {
        return false
    }
    return editorStatus.isTextSelected(props.editor, from)
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