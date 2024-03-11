<!-- 
    字号选择器
-->
<template>
    <n-dropdown :options="options" trigger="click" @select="handleSelect" :render-label="renderLabels">
        <n-button secondary strong icon-placement="right" style="vertical-align: middle; padding-left: 6px; padding-right: 6px; margin-left: 1px; margin-right: 1px;" :class="{'is-active': !!props.editor.getAttributes('textStyle')?.fontSize}">
            <template #icon>
                <n-icon>
                    <KeyboardArrowDownRound/>
                </n-icon>
            </template>
            {{ fontSizeMap[props.editor.getAttributes('textStyle')?.fontSize || ""] }}
        </n-button>
    </n-dropdown>
</template>

<script setup lang="ts">
import { KeyboardArrowDownRound } from '@vicons/material'
import { h, ref } from 'vue'
import type { VNodeChild } from 'vue'
const props = defineProps(['editor'])

const chooseOptions = [
    {
        label: 'Smaller',
        key: 'Smaller',
        props: {
            style: "font-size: 12px;"
        }
    },
    {
        label: 'Small',
        key: 'Small',
        props: {
            style: "font-size: 14px;"
        }
    },
    {
        label: 'Medium',
        key: 'Medium',
        props: {
            style: ""
        }
    },
    {
        label: 'Large',
        key: 'Large',
        props: {
            style: "font-size: 18px;"
        }
    },
    {
        label: 'Extra Large',
        key: 'Extra',
        props: {
            style: "font-size: 24px;"
        }
    }
]
const options = ref(chooseOptions)

const fontSizeMap = {
    '': "Medium", "12px": "Smaller", "14px": "Small", '18px': "Large", "24px": 'Extra'
}

const setFontSizeMap = { 
    "Medium": "", "Smaller": "12px", "Small": "14px" , "Large": '18px', 'Extra': "24px"
}

const handleSelect = (key: string) => {
    props.editor.chain().focus().setFontSize(setFontSizeMap[key]).run()
}

const renderLabels = (option) => {
    if(option.type === 'group') {
        return option.label as VNodeChild
    }
    return h('div', {style: option.props.style}, {default: () => option.label as VNodeChild})
}

</script>

<style scoped>
</style>