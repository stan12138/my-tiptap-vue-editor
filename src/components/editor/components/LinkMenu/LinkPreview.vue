<template>
    <div style="align-items: center; display: flex;">
        <a style="line-height: 34px; padding-left: 14px; padding-right: 14px;" :href="props.editor.getAttributes('link').href" target="_blank" rel="noopener noreferrer">{{ props.editor.getAttributes('link').href }}</a>
        <n-divider vertical style=""></n-divider>
        <n-button strong secondary @click="$emit('editLink')">
            <template #icon>
                <n-icon><Pencil/></n-icon>
            </template>
        </n-button>
        <n-button strong secondary @click="props.editor.chain().focus().extendMarkRange('link').unsetLink().run()">
            <template #icon>
                <n-icon><Trash/></n-icon>
            </template>
        </n-button>
    </div>
</template>
<script setup lang="ts">
import { Pencil, Trash } from '@vicons/tabler'
const props = defineProps(['editor'])
</script>
<style scoped>

</style>