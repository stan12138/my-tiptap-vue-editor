<!-- 
    字号选择器
-->
<template>
    <n-dropdown :options="options" trigger="click" @select="handleSelect">
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
import { ref } from 'vue'

const props = defineProps(['editor'])

const chooseOptions = [
    {
        label: 'Smaller',
        key: 'Smaller',
    },
    {
        label: 'Small',
        key: 'Small',
    },
    {
        label: 'Medium',
        key: 'Medium',
    },
    {
        label: 'Large',
        key: 'Large',
    },
    {
        label: 'Extra Large',
        key: 'Extra',
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

</script>

<style scoped>
</style>