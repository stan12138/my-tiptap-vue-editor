<template>
    <node-view-wrapper class="vue-component">
        <div style="height: 400px;">
            <div v-if="containerID" :id="containerID" style="padding: 0px; margin: 0px; width: 100%; height: 100%;">
                <div style="z-index: 1; background-color: white; position: relative; top: 10px; left: 10px; width: fit-content; height: fit-content; border-radius: 5px; padding: 8px;">
                    <n-collapse class="operator" @item-header-click="operatorClick">
                        <n-collapse-item title="操作" name="1">
                            <n-grid x-gap="0" :cols="4">
                                <n-gi v-if="props.editor.isEditable" :span="3">
                                    <n-switch v-model:value="couldAddMarker" :rail-style="railStyle">
                                        <template #unchecked>
                                            地点检索
                                        </template>
                                        <template #checked>
                                            添加标记点
                                        </template>
                                    </n-switch>
                                </n-gi>
                                <n-gi :span="1">
                                    <n-checkbox v-model:checked="frozen" @update:checked="frozenCheckHandler">冻结</n-checkbox>
                                </n-gi>
                            </n-grid>
                            <n-select v-if="!couldAddMarker && props.editor.isEditable" v-model:value="loc" placeholder="搜索位置" 
                                :options="searchResults" filterable :loading="loading" 
                                clearable remote :clear-filter-after-select="false" 
                                @search="searchLocation" @update:value="selectLoc" class="map-search"/>
                            <div v-if="couldAddMarker && props.editor.isEditable" style="margin: 10px; width: 12.2rem">
                                <!-- <n-input v-model:value="info" type="textarea" placeholder="标记点信息" :autosize="{minRows: 3}" @keyup="initInfoWindow" @input="updateInfoWindow"/> -->
                                <n-input :disabled="lastMarkerKey.length<1" v-model:value="info" type="textarea" placeholder="标记点信息" :autosize="{minRows: 3}" @input="updateLabel"/>
                            </div>
                        </n-collapse-item>
                    </n-collapse>                    
                </div>
            </div>
        </div>
    </node-view-wrapper>
</template>

<script setup lang="ts">
import AMapLoader from "@amap/amap-jsapi-loader";
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { ref, onMounted, watch, CSSProperties } from "vue";
import randomID from "../../utils/randomID";
import { SelectOption } from 'naive-ui'
import mapKey from "../../utils/mapKey";

const props = defineProps(['editor', 'node', 'getPos'])

const loading = ref(false)
const searchResults = ref<SelectOption[]>([])
const loc = ref("")

const info = ref("")

const couldAddMarker = ref(false)
// 是否冻结地图
const frozen = ref(false)

// 地点搜索关键字
const keyword = ref("")
// 地图实例
const map = ref<any>(null);
let geocoder:any;
let locationArr=ref<any>([116.397478, 39.909228])
// AMP
let myAMP;
// 搜索选项
let searchOptions = {}
// 记录当前的标记点信息
let markers = {};
// 用于存储的marker信息
let markersInfo = {};
// 最后一个maker的key
let lastMarkerKey = ref("") 
// 原始zoom
let oriZoom = 14
// 原始中心
let oriCenter = [116.397478, 39.909228]
// 是否需要reload
let needReload = false

// container ID
let containerID = ref(null)
// 初始化
function initMap() {
    // 设置密钥
    window._AMapSecurityConfig = {
        securityJsCode: mapKey.sk, // 密钥
    };
    AMapLoader.load({
        key: mapKey.ak, // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0",
        plugins: ["AMap.ToolBar", "AMap.Scale", "AMap.HawkEye", "AMap.MapType", "AMap.Geolocation", "AMap.Geocoder", 'AMap.PlaceSearch', 'AMap.ControlBar'], 
    }).then((AMap) => {
        myAMP = AMap
        map.value = new AMap.Map(containerID.value, {
            //设置地图容器id
            viewMode: "3D", //是否为3D地图模式
            zoom: oriZoom, //初始化地图级别
            center: oriCenter, //初始化地图中心点位置
        });
        map.value.addControl(new AMap.Scale());
        // map.value.addControl(new AMap.ToolBar());
        // map.value.addControl(new AMap.HawkEye());
        map.value.addControl(new AMap.MapType({position: {bottom: '170px', right: '10px'}}));
        map.value.addControl(new AMap.ControlBar({position: {top: '10px', right: '10px'}}));
        map.value.addControl(new AMap.Geolocation());
        geocoder = new AMap.Geocoder({ city: "010" });
        // 地图点击事件
        map.value.on('click', function(e){
            console.log(props.editor.isActive('MapBlock'))
            props.editor.commands.setNodeSelection(props.getPos())
            let pos = {
                lng: e.lnglat.getLng(), lat: e.lnglat.getLat()
            }
            if(couldAddMarker.value) {
                addMarker(pos.lng, pos.lat)
            }
        })
        if(props.editor.isEditable) {
            // 设置地址的zoom事件
            map.value.on('moveend', () => {
                props.updateAttributes(getUpdateInfo())
            })
            // 设置地图的move事件
            map.value.on('zoomend', () => {
                props.updateAttributes(getUpdateInfo())
            })   
        }
        if(needReload) {
            let attr = props.node.attrs
            for(let key in attr.markers) {
                let marker = attr.markers[key]
                // console.log(marker)
                addMarker(marker.marker[0], marker.marker[1], marker.label, false)
            }
        }
        // 初始化冻结操作
        frozenMap()
    }).catch((e) => {
        console.log(e);
    });
}

const operatorClick = ({expanded}) => {
    if(!expanded) {
        couldAddMarker.value = false;
        info.value = ""
        lastMarkerKey.value = ""
    }
}

watch(couldAddMarker, async (newValue, oldValue) => {
    info.value = ""
})

// 冻结地图
const frozenMap = () => {
    if(frozen.value) {
        map.value.setStatus({
            dragEnable: false,
            keyboardEnable: false,
            doubleClickZoom: false,
            zoomEnable: false,
            rotateEnable: false
        });
    } else {
        map.value.setStatus({
            dragEnable: true,
            keyboardEnable: true,
            doubleClickZoom: true,
            zoomEnable: true,
            rotateEnable: true
        });
    }
}

const frozenCheckHandler = () => {
    frozenMap()
    if(props.editor.isEditable) {
        props.updateAttributes(getUpdateInfo())
    }
}


const getUpdateInfo = () => {
    let center = map.value.getCenter()
    let updateInfo = {
        center: [center.lng, center.lat],
        zoom: map.value.getZoom(),
        markers: markersInfo,
        containerID: containerID.value,
        frozen: frozen.value
    }
    return updateInfo
}

const updateLabel = () => {
    if(lastMarkerKey.value == "") return 
    let marker = markers[lastMarkerKey.value].marker
    let content = info.value
    addLabel(content, marker)
    markers[lastMarkerKey.value]['label'] = content
    markersInfo[lastMarkerKey.value]['label'] = content
    props.updateAttributes(getUpdateInfo())
}

// 只增加label，不会更新任何信息
const addLabel = (content: string, marker: any) => {
    let width = 5
    if(content.length < 2) {
        width = 5
    } else if(content.length < 7) {
        width = content.length + 3
    } else {
        width = 10
    }
    marker.setLabel({direction:'right', offset: new myAMP.Pixel(10, 0), content: `<div class='info' style="width: ${width}rem;">${content}</div>`})
}

function searchLocation(position: string) {
    console.log(position)
    myAMP.plugin("AMap.PlaceSearch", function () {
        var placeSearch = new myAMP.PlaceSearch({
            //city 指定搜索所在城市，支持传入格式有：城市名、citycode 和 adcode
            city: "010",
        });
        placeSearch.search(position, function (status, result) {
            //查询成功时，result 即对应匹配的 POI 信息
            console.log(result);
            searchOptions = {}
            let options = []
            for(let index=0; index<result.poiList.pois.length; index++) {
                let oneLoc = result.poiList.pois[index]
                let key = oneLoc.name;
                let address = oneLoc.address;
                searchOptions[key] = oneLoc
                options.push({
                    label: key,
                    value: key
                })
            }
            // console.log(searchOptions, options)
            searchResults.value = options
        });
    });
}

function closeMarker(index: string){
    if(!props.editor.isEditable) return;
    markers[index].marker.setMap(null);
    if('info' in markers[index]) {
        markers[index].info.close()
    }
    delete markers[index]
    delete markersInfo[index]
    info.value = ""
    // props.editor.chain().focus().updateMarkers(markersInfo).run()
    props.updateAttributes(getUpdateInfo())
    lastMarkerKey.value = ""
}

const addMarker = (lng: number, lat: number, content = "", needUpdate = true) => {
    let index = Object.keys(markers).length.toString()
    let pos = new myAMP.LngLat(lng, lat)
    let markerContent = `
        <div class="custom-content-marker">
           <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png">
           <div class="close-btn" onclick="closeMarker(${index})">X</div>
        </div>
    `;
    let marker = new myAMP.Marker({
        position: pos, 
        draggable: props.editor.isEditable, 
        content: markerContent,
        // icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png', 
        offset: new myAMP.Pixel(-13, -30),
        title: `lng: ${lng}, lat:${lat}`
    });
    // marker.on("click", function(e) {
    //     closeMarker(index);
    // })
    // 妈的，label无法设置自动换行，整了一天也没搞定，气死我了
    info.value = ""
    markers[index] = {"marker": marker}
    markersInfo[index] = {"marker": [lng, lat]}
    lastMarkerKey.value = index
    map.value.add(marker)
    if(content != "") {
        addLabel(content, marker)
        markers[index].label = content
        markersInfo[index].label = content
    }
    if(needUpdate) {
        props.updateAttributes(getUpdateInfo())
    }
    marker.on('dragend', function(e) {
        let pos = marker.getPosition()
        markersInfo[index] = {"marker": [pos.lng, pos.lat]}
        props.updateAttributes(getUpdateInfo())
    })
}

// 搜索选择目标
const selectLoc = (query: string) => {
    if(query=="") return
    let res = searchOptions[query]
    if(!res || !("location" in res)) {
        return 
    }
    // console.log(res.location.lat, res.location.lng, res)
    map.value.setZoomAndCenter(13.5, [res.location.lng, res.location.lat]); 
    addMarker(res.location.lng, res.location.lat, res.name)
}

// switch按钮的样式
const railStyle = ({focused, checked}) => {
    const style: CSSProperties = {}
    style.marginLeft = "10px"
    if (checked) {
        style.background = '#d03050'
        if (focused) {
            style.boxShadow = '0 0 0 2px #d0305040'
        }
    } else {
        style.background = '#2080f0'
        if (focused) {
            style.boxShadow = '0 0 0 2px #2080f040'
        }
    }
    return style
}

onMounted(() => {
    let attr = props.node.attrs
    needReload = (attr.center.length == 2 && attr.containerID != "") ? true : false
    frozen.value = attr.frozen
    // 认为是load数据
    if(needReload) {
        oriZoom = attr.zoom
        oriCenter = attr.center
        containerID.value = attr.containerID
    } else {
        containerID.value = randomID(10)
    }
    initMap();
    // 标记点的点击事件需要在window中注册！！！！
    window['closeMarker'] = (index: number) => {
        closeMarker(index)
    }
});
</script>

<style scoped>
.map-search{
    z-index: 1;
    /* padding-left: 10px; */
    padding-top: 10px;
    margin-left: 10px;
    padding-right: 10px;
    /* width: 40%; */
}

.operator {
    position: relative;
    z-index: 1;
}

</style>


<script lang="ts">
// delete的代码，也许有用后面？
    // let markerContent = `
    // <div class="custom-content-marker">
    //     <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png">
    //     <div class="close-btn" onclick="closeMarker(${index})">x</div>
    // </div>
    // `
// function createInfoWindow(content) {
//     var info = document.createElement("div");
//     info.className = "custom-info input-card content-window-card";

//     //可以通过下面的方式修改自定义窗体的宽高
//     info.style.width = "100px";

//     // 定义中部内容
//     var middle = document.createElement("div");
//     middle.className = "info-middle";
//     middle.style.backgroundColor = 'white';
//     middle.innerHTML = content;
//     info.appendChild(middle);

//     // 定义底部内容
//     var bottom = document.createElement("div");
//     bottom.className = "info-bottom";
//     bottom.style.position = 'relative';
//     bottom.style.top = '0px';
//     bottom.style.margin = '0 auto';
//     var sharp = document.createElement("img");
//     sharp.src = "https://webapi.amap.com/images/sharp.png";
//     bottom.appendChild(sharp);
//     info.appendChild(bottom);
//     return info;
// }

// const initInfoWindow = (event) => {
//     if(event.code != 'Enter' || lastMarkerKey == "") {
//         return 
//     }
//     let marker = markers[lastMarkerKey]
//     if("info" in marker) return;
//     let content = `
//     <div class='input-card content-window-card'>
//         <div style="padding:7px 0px 0px 0px;">
//             <p class='input-item'>${info.value}</p>
//         </div>
//     </div> 
//     `
//     let infoWindow = new myAMP.InfoWindow({
//         // isCustom: true,
//         content: content,
//         offset: new myAMP.Pixel(0, -20)
//     })
//     infoWindow.open(map.value, marker.marker.getPosition())
//     markers[lastMarkerKey]['info'] = infoWindow
// }

// const updateInfoWindow = () => {
//     console.log("update")
//     if(lastMarkerKey == "") return 
//     let marker = markers[lastMarkerKey]
//     if(!('info' in marker)) return 
//     if(info.value.length < 1) {
//         marker.info.close()
//         delete marker.info
//         return
//     }
//     let content = `
//     <div class='input-card content-window-card'>
//         <div style="padding:7px 0px 0px 0px;">
//             <p class='input-item' style="white-space: pre;">${info.value}</p>
//         </div>
//     </div> 
//     `
//     console.log("update begin", content)
//     marker.info.setContent(content)
// }

        // 设置地址的zoom事件
        // map.value.on('moveend', () => {
        //     let center = map.value.getCenter()
        //     // props.editor.chain().focus().updateImageBlockSrc(image_href.value).run()
        //     props.editor.chain().updateCenter([center.lng, center.lat]).run()
        //     console.log('center chaneg, lng:', center.lng, ", lat:", center.lat)
        // })
        // 设置地图的move事件
        // map.value.on('zoomend', () => {
        //     let zoom = map.value.getZoom()
        //     props.editor.chain().updateZoom(zoom).run()
        //     console.log('zoom change:', zoom)
        // })
</script>