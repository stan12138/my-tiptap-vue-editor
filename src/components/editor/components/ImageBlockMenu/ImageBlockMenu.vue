<!-- 点击图片之后弹出的bubble menu -->
<template>
    <bubble-menu :tippyOptions="tippyOptions" pluginKey="imageBlockMenu" :shouldShow="shouldShow" :editor="props.editor" style="padding: 0.35rem; border: 1px solid rgb(229, 229, 229); background-color: white; border-radius: 0.5rem">
        <n-input v-model:value="image_href" type="url" placeholder="image url" @keyup="changeUrl" style="width: 10rem;"/>
        <!-- <a style="line-height: 34px; padding-left: 14px; padding-right: 14px;" :href="props.editor.getAttributes('imageBlock').src" target="_blank" rel="noopener noreferrer">{{ props.editor.getAttributes('imageBlock').src }}</a> -->
        <n-divider vertical style="margin: 0;"></n-divider>
        <ToolTipWrapper tip="左对齐">
            <n-button strong secondary style="vertical-align: middle; padding-left: 6px; padding-right: 6px; margin-left: 1px; margin-right: 1px;" :class="{'is-active': checkActive('left')}" @click="props.editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign('left').run()">
                <template #icon>
                    <n-icon><LayoutAlignLeft /></n-icon>
                </template>
            </n-button>
        </ToolTipWrapper>
        <ToolTipWrapper tip="居中">
            <n-button strong secondary style="vertical-align: middle; padding-left: 6px; padding-right: 6px; margin-left: 1px; margin-right: 1px;" :class="{'is-active': checkActive('center')}" @click="props.editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign('center').run()">
                <template #icon>
                    <n-icon><LayoutAlignMiddle/></n-icon>
                </template>
            </n-button>
        </ToolTipWrapper>
        <ToolTipWrapper tip="右对齐">
            <n-button strong secondary style="vertical-align: middle; padding-left: 6px; padding-right: 6px; margin-left: 1px; margin-right: 1px;" :class="{'is-active': checkActive('right')}" @click="props.editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign('right').run()">
                <template #icon>
                    <n-icon><LayoutAlignRight/></n-icon>
                </template>
            </n-button>
        </ToolTipWrapper>
        <ToolTipWrapper tip="取消锁定长宽比">
            <n-button strong secondary style="vertical-align: middle; padding-left: 6px; padding-right: 6px; margin-left: 1px; margin-right: 1px;" :class="{'is-active': isUnlock()}" @click="props.editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockLockRatio(!unLockRatio).run()">
                <template #icon>
                    <n-icon><Unlink/></n-icon>
                </template>
            </n-button>
        </ToolTipWrapper>
        <!-- <n-divider vertical style="margin: 0;"></n-divider> -->
        <!-- <n-slider v-model:value="imageSize" :step="1" :format-tooltip="formatTooltip" @update:value="changeSize" style="display: inline-flex; position: relative; width: 6rem; vertical-align: middle; padding-left: 6px; padding-right: 6px; margin-left: 1px; margin-right: 1px; z-index: 100000; "/> -->
    </bubble-menu>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { BubbleMenu, getAttributes } from '@tiptap/vue-3'
import { LayoutAlignLeft, LayoutAlignMiddle, LayoutAlignRight, Unlink } from '@vicons/tabler'
import ToolTipWrapper from '../../../tooltipwrapper/ToolTipWrapper.vue'
// import editorStatus from '../../utils/editorStatus.ts'

const props = defineProps(['editor'])

const unLockRatio = ref(false)

const shouldShow = ({view, from}) => {
    // console.log(props.editor.state?.selection?.node?.type.name, from, view)
    // 此处直接检查isActive会有一次错误出现menu
    if(view.state?.selection?.node?.type?.name == 'imageBlock') {
        return true;
    }
    return false;
    // return props.editor.isActive('imageBlock')
}

const checkActive = (label) => {
    // console.log(props.editor.getAttributes('imageBlock'), props.editor.isActive('imageBlock', {'align': label}), label)
    return props.editor.isActive('imageBlock', {'align': label})
}

const isUnlock = () => {
    let status = props.editor.isActive('imageBlock', {'unLockRatio': true})
    unLockRatio.value = status
    return status
}

const showEdit = ref(false)

const imageSize = ref(100)

const image_href = ref(props.editor.getAttributes('imageBlock').src)

const formatTooltip = (value: number) => {
    return `${value}%`
}

const changeSize = (value) => {
    // 执行速度有点慢，咋办.....
    return props.editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockWidth(value).run()
}

const changeUrl = (event) => {
    // console.log(event.keyCode)
    if(event.keyCode == 13) {
        console.log(image_href.value)
        props.editor.chain().focus(undefined, { scrollIntoView: false }).updateImageBlockSrc(image_href.value).run()
    }
}

const menuShow = () => {
    // console.log(props.editor.getAttributes('imageBlock').src)
    image_href.value = props.editor.getAttributes('imageBlock').src
}

const tippyOptions = ref({
    'maxWidth': 'auto',
    'zIndex': 20,
    'appendTo': 'parent',
    'onShow': menuShow
})

</script>

<style scoped>
:deep() .n-button {
    background-color: white;
}

/* Editor中的样式设置了所有按钮的背景色是白色，这里重新设置一下is-active保证is-active优先级最高，生效选中效果 */
:deep() .is-active {
    background-color: rgba(0, 0, 0, 0.1);
}

:deep() .n-input-wrapper {
    padding-left: 2px;
    padding-right: 2px;
}

:deep() .n-input {
    margin-left: 6px;
    margin-right: 10px;
}

</style>

<!-- <style>
:deep() .v-binder-follower-container {
    z-index: 20000;
}
</style> -->