<template>
    <node-view-wrapper class="vue-component">
        <div :style="{width: props.node.attrs.width}" :class="{'img-margin-left': props.node.attrs.align=='left', 'img-margin-center': props.node.attrs.align=='center', 'img-margin-right': props.node.attrs.align=='right'}">
            <div>
                <img :src="props.node.attrs.src" alt="" @click="" />
            </div>
        </div>
    </node-view-wrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

import { useMessage } from 'naive-ui'

const props = defineProps(['node'])


</script>

<style scoped>
.img-margin-left {
    margin-right: auto;
    margin-left: 0;
}

.img-margin-center {
    margin-right: auto;
    margin-left: auto;
}

.img-margin-right {
    margin-left: auto;
    margin-right: 0;
}

</style>