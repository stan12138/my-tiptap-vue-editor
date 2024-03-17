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
import content from './content.ts'
let initContent = ''
// let initContent = '<h1>地图测试</h1><p>这是地图前的数据</p><p>第一份地图，单标记点</p><div data-center="[116.394427,39.91134]" data-zoom="13.97" data-markers="{&quot;0&quot;:{&quot;marker&quot;:[116.214813,40.035686],&quot;label&quot;:&quot;保利·西山林语三区&quot;}}" data-type="MapBlock" data-containerid="bJcDAvTjug"></div><p>第二份地图：多标记点</p><div data-center="[116.300896,40.029403]" data-zoom="11.95" data-markers="{&quot;0&quot;:{&quot;marker&quot;:[116.342907,39.72473]},&quot;1&quot;:{&quot;marker&quot;:[116.274981,40.044114],&quot;label&quot;:&quot;我的位置，百度科技园&quot;}}" data-type="MapBlock" data-containerid="pUEWdeczmT"></div><p>好的，一共两幅地图</p><img src="http://127.0.0.1:10007/pic/editor/1710527528634_77.png" data-width="468" data-height="194" data-align="right" data-unlockratio="false"><p></p><p></p><p></p><p></p><p></p><p>你好，你是说？非服务</p>'
// let initContent = '<h1>地图测试</h1><p>这是地图前的数据</p><p>第一份地图，单标记点</p><div data-center="[116.394427,39.91134]" data-zoom="13.97" data-markers="{&quot;0&quot;:{&quot;marker&quot;:[116.214813,40.035686],&quot;label&quot;:&quot;保利·西山林语三区&quot;}}" data-type="MapBlock" data-containerid="bJcDAvTjug"></div><p>第二份地图：多标记点</p><div data-center="[116.283569,39.987615]" data-zoom="12.36" data-markers="{&quot;0&quot;:{&quot;marker&quot;:[116.397573,39.908998],&quot;label&quot;:&quot;中山公园，冲&quot;},&quot;1&quot;:{&quot;marker&quot;:[116.274981,40.044114],&quot;label&quot;:&quot;我的位置，百度科技园&quot;},&quot;2&quot;:{&quot;marker&quot;:[116.274778,40.001025],&quot;label&quot;:&quot;这里是颐和园&quot;},&quot;3&quot;:{&quot;marker&quot;:[116.308181,40.012282],&quot;label&quot;:&quot;这里是圆明园&quot;}}" data-type="MapBlock" data-containerid="pUEWdeczmT"></div><p>好的，一共两幅地图</p><p></p>'
// const initContent = `<h1>标题</h1><p>你好</p><img src="http://127.0.0.1:10007/pic/editor/1709714010856_242.jpeg" data-width="236" data-align="left" data-unlockratio="false"><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><pre><code class="language-python">def hello():
//     print("wawa")</code></pre><div data-type="columns" class="layout-sidebar-left"><div data-position="left" data-type="column"><img src="http://127.0.0.1:10007/pic/editor/1709714610620_421.png" data-align="center" data-unlockratio="false"><p></p></div><div data-position="right" data-type="column"><p>你好呀，这是一张图片</p></div></div><p></p>`

const updateConent = (content, html) => {
    // console.log(html)
    console.log(getTitle(content))
    // console.log(JSON.stringify(content))
}

const getTitle = (content) => {
    if(('content' in content) && content.content.length>0) {
        let head = content.content[0]
        if(head.type=='heading' && ('content' in head) && head.content[0].text && head.content[0].text.length>0) {
            for(let index=1; index<content.content.length; index++) {
                if(checkContent(content.content[index])) {
                    return head.content[0].text
                }
            }
        }
    }

    return ""
}

const checkContent = (content) => {
    if(content && content.type == 'paragraph' && ('content' in content) && content.content[0].text.length>0) {
        return true
    }
    return false
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