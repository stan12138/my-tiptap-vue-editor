<!-- 
    字体选择器
-->
<template>
    <n-dropdown :options="options" trigger="click" @select="handleSelect">
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
import { ref } from 'vue'

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
            },
            {
                label: 'Arial',
                key: 'Arial',
            },
            {
                label: 'Helvetica',
                key: 'Helvetica',
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
            },
            {
                label: 'Garamond',
                key: 'Garamond',
            },
            {
                label: 'Georgia',
                key: 'Georgia',
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
            },
            {
                label: 'Courier New',
                key: 'Courier New',
            }
        ]
    },
]
const options = ref(chooseOptions)

const handleSelect = (key: string) => {
    props.editor.chain().focus().setFontFamily(key).run()
}

</script>

<style scoped>
</style>