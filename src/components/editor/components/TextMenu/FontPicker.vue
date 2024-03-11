<!-- 
    字体选择器
-->
<template>
    <n-dropdown :options="options" trigger="click" @select="handleSelect" :render-label="renderLabels">
        <n-button secondary strong icon-placement="right" style="vertical-align: middle; padding-left: 6px; padding-right: 6px; margin-left: 1px; margin-right: 1px;" :class="{'is-active': !!props.editor.getAttributes('textStyle')?.fontFamily}">
            <template #icon>
                <n-icon>
                    <KeyboardArrowDownRound/>
                </n-icon>
            </template>
            {{ props.editor.getAttributes('textStyle')?.fontFamily || "Inter" }}
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
        type: 'group',
        label: 'SANS SERIF',
        key: 'main',
        children: [
            {
                label: 'Inter',
                key: '',
                props: {
                    style: ""
                }
            },
            {
                label: 'Arial',
                key: 'Arial',
                props: {
                    style: "font-family: Arial;"
                }
            },
            {
                label: 'Helvetica',
                key: 'Helvetica',
                props: {
                    style: "font-family: Helvetica;"
                }
            }
        ]
    },
    {
        type: 'group',
        label: 'SERIF',
        key: 'second',
        children: [
            {
                label: 'Times New Roman',
                key: 'Times',
                props: {
                    style: "font-family: Times;"
                }
            },
            {
                label: 'Garamond',
                key: 'Garamond',
                props: {
                    style: "font-family: Garamond;"
                }
            },
            {
                label: 'Georgia',
                key: 'Georgia',
                props: {
                    style: "font-family: Georgia;"
                }
            }
        ]
    },
    {
        type: 'group',
        label: 'MONOSPACE',
        key: 'third',
        children: [
            {
                label: 'Courier',
                key: 'Courier',
                props: {
                    style: "font-family: Courier;"
                }
            },
            {
                label: 'Courier New',
                key: 'Courier New',
                props: {
                    style: 'font-family: "Courier New"'
                }
            }
        ]
    },
]
const options = ref(chooseOptions)

// 自定义option的字体
const renderLabels = (option) => {
    if(option.type === 'group') {
        return option.label as VNodeChild
    }
    return h('div', {style: option.props.style}, {default: () => option.label as VNodeChild})
}

const handleSelect = (key: string) => {
    props.editor.chain().focus().setFontFamily(key).run()
}

</script>

<style scoped>
</style>