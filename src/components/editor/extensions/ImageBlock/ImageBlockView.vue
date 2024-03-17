<template>
    <node-view-wrapper class="image-view-container" :class="`image-view-${props.node.attrs.align}`">
        <div draggable="true" data-drag-handle :class="{'image-view__body--focused': (props.selected || resizing)&&props.editor.isEditable, 'image-view__body--resizing': resizing}" class="image-view-body">
            <img :src="props.node.attrs.src" alt="" @click="onClick" @load="imageLoad" class="image-content" :style="{width: props.node.attrs.width?.toString()+'px', height: props.node.attrs.height?.toString()+'px'}" />
            <span v-if="props.editor.isEditable" v-show="props.selected || resizing" v-for="direction in resizeDirections" :key="direction" :class="`image-resizer-handler-${direction}`" @mousedown="mouseDown($event, direction)" class="image-resizer-handler"></span>
        </div>
    </node-view-wrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { ref, unref } from 'vue'
import { useMessage } from 'naive-ui'
import editorStatus from '../../utils/editorStatus';

const props = defineProps(['editor', 'node', 'getPos', 'selected'])

const resizing = ref(false)

const unLockRatio = ref(false)

// 初始尺寸
const oriSize = ref({
    width: 0, height: 0
})

// 开始缩放时的状态记录
const beginStat = ref({
    x: 0, y: 0, w: 0, h: 0, direc: ""
})

const resizeDirections = ["tl", "tr", "bl", "br"]

const onClick = () => {
    props.editor.commands.setNodeSelection(props.getPos())
}

// 开始缩放
const mouseMove = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const { x, y, w, h, direc } = unref(beginStat)

    // const dx = (e.clientX - x) * (/l/.test(direc) ? -1 : 1)
    // const dy = (e.clientY - y) * (/t/.test(direc) ? -1 : 1)
    const dx = (e.clientX - x) * (/l/.test(direc) ? -1 : 1)
    const dy = (e.clientY - y) * (/t/.test(direc) ? -1 : 1)

    const width = Math.abs(w + dx)
    const height = Math.abs(h + dx)
    if(unLockRatio.value) {
        props.updateAttributes({
            width, height
        })
    } else {
        props.updateAttributes({
            width,
        })
    }

}

// 停止缩放
const mouseUp = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    resizing.value = false
    beginStat.value = {
        x: 0, y: 0, w: 0, h: 0, direc: ""
    }
    unRegisterEvent()
    onClick()
}

// 开始注册缩放事件
const registerEvent = () => {
    document?.addEventListener('mousemove', mouseMove, true)
    document?.addEventListener('mouseup', mouseUp, true)
}

// 停止缩放放弃注册
const unRegisterEvent = () => {
    document?.removeEventListener('mousemove', mouseMove, true)
    document?.removeEventListener('mouseup', mouseUp, true)
}

const mouseDown = (e: MouseEvent, direc: string) => {
    e.preventDefault()
    e.stopPropagation()
    let width = props.node.attrs.width ? props.node.attrs.width : oriSize.value.width
    let height = props.node.attrs.height ? props.node.attrs.height : oriSize.value.height
    beginStat.value = {
        x: e.clientX,
        y: e.clientY,
        w: width,
        h: height,
        direc: direc
    }
    resizing.value = true
    unLockRatio.value = props.editor.isActive('imageBlock', {'unLockRatio': true})
    console.log("begin pos: ", e.clientX, e.clientY, "begin size:", width, height, "lock status", unLockRatio.value)
    registerEvent()
}

// 图片加载成功，记录图片尺寸
const imageLoad = (e: any) => {
    oriSize.value = {
        width: e.target.width,
        height: e.target.height
    }
    // console.log("img origin size:", e.target.width, e.target.height)
}

</script>

<style scoped>
.image-view-center {
    display: flex;
    justify-content: center; /* 水平居中 */
}

.image-view-left {
    width: fit-content;
    /* float: left; */
}

.image-view-right {
    width: fit-content;
    float: right;
    clear: right;
    /* display: inline-block; 
    text-align: right; */
}

.image-content {
    border-radius: 3px;
}

/* .image-resizer {
    position: absolute;
} */

.image-view__body--focused {
    outline: 2px solid #409eff;
}

.image-view-container {
    position: relative;
    height: fit-content;
    /* width: fit-content; */
}

.image-view-body {
    position: relative;
    width: fit-content;
    height: fit-content;
    padding: 0;
    line-height: 0;  /*天杀的line-height导致div比图片高了一些*/
}

.image-resizer-handler {
    width: 10px;
    height: 10px;
    border: 2px solid #409eff;
    background: #409eff;
    position: absolute;
}

.image-resizer-handler-tl {
    top: -5px;
    left: -5px;
    cursor: nwse-resize;
}
.image-resizer-handler-bl {
    bottom: -5px;
    left: -5px;
    cursor: nesw-resize;
}
.image-resizer-handler-tr {
    top: -5px;
    right: -5px;
    cursor: nesw-resize;
}
.image-resizer-handler-br {
    bottom: -5px;
    right: -5px;
    cursor: nwse-resize;
}

</style>
