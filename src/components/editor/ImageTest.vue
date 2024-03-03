<template>
    <div id="resize-container" :class="{highlight_container: selected}" class="resizer_container">
        <img id="resizable-image" src="http://127.0.0.1:10007/pic/editor/1709176595429_366.png" @load="onImageLoad" alt="Resizable Image" @click="selectImage">
        <div class="resizer top-left" v-show="selected" @mousedown="clickResizer($event, 'tl')"></div>
        <div class="resizer top-right" v-show="selected" @mousedown="clickResizer($event, 'tr')"></div>
        <div class="resizer bottom-left" v-show="selected" @mousedown="clickResizer($event, 'bl')"></div>
        <div class="resizer bottom-right" v-show="selected" @mousedown="clickResizer($event, 'br')"></div>
    </div>
</template>

<script setup lang="ts">

import { ref } from "vue"

const originSize = ref({
    width: 0,
    height: 0
})

const selected = ref(false)

const resizerState = ref({
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  dir: ''
})

const onImageLoad = (e) => {
    console.log(e.target.width, e.target.height)
    originSize.value = {
        width: e.target.width,
        height: e.target.height
    }
}

const selectImage = () => {
    selected.value = true;
}

const clickResizer = (e: MouseEvent, direction: string) => {
    e.preventDefault()
    e.stopPropagation()

    resizerState.value.x = e.clientX
    resizerState.value.y = e.clientY

    const originalWidth = originSize.value.width
    const originalHeight = originSize.value.height
    const aspectRatio = originalWidth / originalHeight

    let width = Number(props.node.attrs.width)
    let height = Number(props.node.attrs.height)
    // const maxWidth = unref(maxSize).width

    // if (width && !height) {
    // width = width > maxWidth ? maxWidth : width
    // height = Math.round(width / aspectRatio)
    // } else if (height && !width) {
    // width = Math.round(height * aspectRatio)
    // width = width > maxWidth ? maxWidth : width
    // } else if (!width && !height) {
    // width = originalWidth > maxWidth ? maxWidth : originalWidth
    // height = Math.round(width / aspectRatio)
    // } else {
    // width = width > maxWidth ? maxWidth : width
    // }

    resizerState.value.w = width
    resizerState.value.h = height
    resizerState.value.dir = dir

    resizing.value = true

    onEvents()
}

</script>

<style scoped>
.resizer_container {
  position: relative;
  display: inline-block;
}

.resizer {
  width: 10px;
  height: 10px;
  border: 2px solid #00f;
  background: #00f;
  position: absolute;
  cursor: nwse-resize;
}

.highlight_container {
    border: 2px solid #00f;
}

.top-left {
  left: -5px;
  top: -5px;
}

.top-right {
  right: -5px;
  top: -5px;
}

.bottom-left {
  left: -5px;
  bottom: -5px;
}

.bottom-right {
  right: -5px;
  bottom: -5px;
}

#resizable-image {
  width: 100%;
  height: auto;
}
</style>