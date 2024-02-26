<template>
    <node-view-wrapper class="vue-component">
        <n-upload @before-upload="beforeUpload" :max="1" :custom-request="customRequest">
            <n-upload-dragger>
                <div style="margin-bottom: 12px">
                    <n-icon size="48" :depth="3">
                        <CloudUploadOutline />
                    </n-icon>
                </div>
                <n-text style="font-size: 16px">
                    上传图片
                </n-text>
            </n-upload-dragger>
        </n-upload>
    </node-view-wrapper>
</template>

<script setup lang="ts">
import { CloudUploadOutline } from '@vicons/ionicons5'
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

import { useMessage } from 'naive-ui'
const message = useMessage();
const props = defineProps(['props', 'editor', "getPos"])

const beforeUpload = (data) => {
    if (data.file.file?.type !== 'image/png') {
        message.error('只能上传png格式的图片文件，请重新上传')
        return false
    }
    return true
}

const customRequest = () => {
    console.log(props.editor)
    const url = "https://pic1.zhimg.com/80/v2-d6159f5f122fb981218f97ab3bd3cafc_720w.webp"
    props.editor.chain().setImageBlock({ src: url }).deleteRange({ from: props.getPos(), to: props.getPos() }).focus().run()
}

</script>

<style scoped>

</style>