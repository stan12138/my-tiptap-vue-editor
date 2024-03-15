<template>
    <div style="">
        <n-button @click="getNotes">获取</n-button>
        <n-grid x-gap="12" :cols="10">
            <n-gi :offset="1" :span="8">
                <Editor v-if="ok" @update="updateConent" :content="initContent"></Editor>
            </n-gi>
        </n-grid>
    </div>
</template>

<script setup lang="ts">
import { Request } from '../plugins/request.ts'
import Editor from "../components/editor/Editor.vue"
import { ref } from 'vue'
let initContent = '<h1>地图测试</h1><p>这是地图前的数据</p><p>第一份地图，单标记点</p><div data-center="[116.394427,39.91134]" data-zoom="13.97" data-markers="{&quot;0&quot;:{&quot;marker&quot;:[116.214813,40.035686],&quot;label&quot;:&quot;保利·西山林语三区&quot;}}" data-type="MapBlock" data-containerid="bJcDAvTjug"></div><p>第二份地图：多标记点</p><div data-center="[116.283569,39.987615]" data-zoom="12.36" data-markers="{&quot;0&quot;:{&quot;marker&quot;:[116.397573,39.908998],&quot;label&quot;:&quot;中山公园，冲&quot;},&quot;1&quot;:{&quot;marker&quot;:[116.274981,40.044114],&quot;label&quot;:&quot;我的位置，百度科技园&quot;},&quot;2&quot;:{&quot;marker&quot;:[116.274778,40.001025],&quot;label&quot;:&quot;这里是颐和园&quot;},&quot;3&quot;:{&quot;marker&quot;:[116.308181,40.012282],&quot;label&quot;:&quot;这里是圆明园&quot;}}" data-type="MapBlock" data-containerid="pUEWdeczmT"></div><p>好的，一共两幅地图</p><p></p>'
// const initContent = `<h1>标题</h1><p>你好</p><img src="http://127.0.0.1:10007/pic/editor/1709714010856_242.jpeg" data-width="236" data-align="left" data-unlockratio="false"><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><pre><code class="language-python">def hello():
//     print("wawa")</code></pre><div data-type="columns" class="layout-sidebar-left"><div data-position="left" data-type="column"><img src="http://127.0.0.1:10007/pic/editor/1709714610620_421.png" data-align="center" data-unlockratio="false"><p></p></div><div data-position="right" data-type="column"><p>你好呀，这是一张图片</p></div></div><p></p>`

const updateConent = (content, html) => {
    console.log(html)
}

const ok = ref(true)

const getNotes = () => {
    let url = "http://127.0.0.1:10007/api/test/get_one_json_notes"
    let params = {
        name: "服务器管理_48.json"
    }
    Request.get(url, params).then((res) => {
        let c = JSON.parse(res.data.data)
        console.log(c)
        initContent = c
        ok.value = true
    })
}

</script>

<style scoped>

</style>