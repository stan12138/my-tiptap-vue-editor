<template>
    <node-view-wrapper class="vue-component">
        <n-upload :max="1" :custom-request="customRequest" accept="image/*">
            <n-upload-dragger>
                <div style="margin-bottom: 12px">
                    <n-icon size="48" :depth="3">
                        <CloudUploadOutline />
                    </n-icon>
                </div>
                <n-text style="font-size: 16px">
                    拖拽或点击上传图片
                </n-text>
            </n-upload-dragger>
        </n-upload>
        <div>
            <n-input-group>
                <n-input placeholder="图片链接" :input-props="{ type: 'url' }" v-model:value="inputUrl">
                    <template #prefix>
                        <n-icon :component="Link" />
                    </template>
                </n-input>
                <n-button strong secondary type="success" @click="addImage">Submit</n-button>
            </n-input-group>
        </div>
    </node-view-wrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Link } from '@vicons/tabler'
import { CloudUploadOutline } from '@vicons/ionicons5'
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { Request } from '../../../../plugins/request.ts'

import { useMessage, UploadCustomRequestOptions } from 'naive-ui'
const message = useMessage();
const props = defineProps(['props', 'editor', "getPos"])

const inputUrl = ref("")

const uploadDone = (res: object) => {
    let url = "http://127.0.0.1:10007" + res.data.url
    props.editor.chain().setImageBlock({ src: url }).deleteRange({ from: props.getPos(), to: props.getPos() }).focus().run()
    // console.log(res)
    return true
}

const customRequest = ({
      file,
      data,
      headers,
      withCredentials,
      action,
      onFinish,
      onError,
      onProgress
    }: UploadCustomRequestOptions) => {
    console.log(file.file)
    Request.singleFilePost("http://127.0.0.1:10007/api/picture/upload_editor_picture", file.file as File).then((res: any) => {
        uploadDone(res)
    })
    // console.log(props.editor)
    // const url = "https://pic1.zhimg.com/80/v2-d6159f5f122fb981218f97ab3bd3cafc_720w.webp"
    
}

const addImage = () => {
    props.editor.chain().setImageBlock({ src: inputUrl.value }).deleteRange({ from: props.getPos(), to: props.getPos() }).focus().run()
}

</script>

<style scoped>

</style>