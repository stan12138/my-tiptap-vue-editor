<template>
    <n-popover trigger="click">
        <template #trigger>
            <n-button strong secondary style="vertical-align: middle; padding-left: 6px; padding-right: 6px; margin-left: 1px; margin-right: 1px;" :class="{'is-active': (!!props.editor.getAttributes('highlight')?.color && props.editor.getAttributes('highlight').color!='#FFFFFFFF')}">
                <template #icon>
                    <n-icon><Highlight/></n-icon>
                </template>
            </n-button>
        </template>
        <Sketch v-model="colors" style="box-shadow: unset;"/>
    </n-popover>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Sketch } from '@ckpack/vue-color';
import { Highlight } from '@vicons/tabler'
const props = defineProps(['editor'])
const colors = ref('#FFFFFFFF');

watch(colors, async (newValue, oldValue) => {
    // console.log(newValue.hex8)
    props.editor.chain().setHighlight({ color: newValue.hex8 }).run()
})


</script>

<style scoped>


</style>