<template>
    <div style="">
        <!-- <n-button>导出</n-button> -->
        <n-grid x-gap="12" :cols="10">
            <n-gi :offset="1" :span="8">
                <Editor @update="updateConent" :content="initContent"></Editor>
            </n-gi>
        </n-grid>
    </div>
</template>

<script setup lang="ts">
import Editor from "../components/editor/Editor.vue"
import { ref } from 'vue'
const initContent = ''
// const initContent = `<h1>标题</h1><p>你好</p><img src="http://127.0.0.1:10007/pic/editor/1709714010856_242.jpeg" data-width="236" data-align="left" data-unlockratio="false"><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><pre><code class="language-python">def hello():
//     print("wawa")</code></pre><div data-type="columns" class="layout-sidebar-left"><div data-position="left" data-type="column"><img src="http://127.0.0.1:10007/pic/editor/1709714610620_421.png" data-align="center" data-unlockratio="false"><p></p></div><div data-position="right" data-type="column"><p>你好呀，这是一张图片</p></div></div><p></p>`

const updateConent = (content, html) => {
    // console.log(html)
}


</script>

<style scoped>

</style>