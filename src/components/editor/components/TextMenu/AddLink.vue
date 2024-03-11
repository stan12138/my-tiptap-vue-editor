<template>
    <n-tooltip trigger="hover">
        <template #trigger>
            <n-popover trigger="click">
                <template #trigger>
                    <n-button strong secondary style="vertical-align: middle; padding-left: 6px; padding-right: 6px; margin-left: 1px; margin-right: 1px;">
                        <template #icon>
                            <n-icon><Link/></n-icon>
                        </template>
                    </n-button>
                </template>
                <div>
                    <n-grid :cols="3" x-gap="12">
                        <n-gi :span="2">
                            <n-input placeholder="Enter URL" type="url" style="display: inline-block;" v-model:value="url">
                                <template #prefix>
                                    <n-icon :component="Link" />
                                </template>
                            </n-input>
                        </n-gi>
                        <n-gi :span="1">
                            <n-button strong secondary type="primary" style="display: inline-block;" @click="add_link">
                                Set Link
                            </n-button>
                        </n-gi>
                    </n-grid>
                    <div style="margin-top: 8px; font-weight: 600; font-size: .875rem;">
                        <label>
                            Open in new tab
                            <n-switch v-model:value="newTab" />
                        </label>
                    </div>
                </div>
            </n-popover>
        </template>
        Add Link
    </n-tooltip>
</template>
<script setup lang="ts">
import { Link } from '@vicons/tabler'
import { ref } from 'vue'

const props = defineProps(['editor'])
const url = ref("")
const newTab = ref(false)

const add_link = () => {
    props.editor.chain().focus().extendMarkRange('link').setLink({href: url.value, target: newTab.value ? '_blank' : ''}).run()
}


</script>