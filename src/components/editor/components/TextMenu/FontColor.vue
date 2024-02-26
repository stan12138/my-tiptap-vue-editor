<template>
    <n-popover trigger="click">
        <template #trigger>
            <n-button strong secondary style="vertical-align: middle; padding-left: 6px; padding-right: 6px; margin-left: 1px; margin-right: 1px;" :class="{'is-active': (!!props.editor.getAttributes('textStyle')?.color && props.editor.getAttributes('textStyle').color!='#000000FF')}">
                <template #icon>
                    <n-icon><Palette/></n-icon>
                </template>
            </n-button>
        </template>
        <Sketch v-model="colors" style="box-shadow: unset;"/>
    </n-popover>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Sketch } from '@ckpack/vue-color';
import { Palette } from '@vicons/tabler'
const props = defineProps(['editor'])
const colors = ref('#000000FF');

watch(colors, async (newValue, oldValue) => {
    // console.log(newValue.hex8)
    props.editor.chain().setColor(newValue.hex8).run()
})


</script>

<style scoped>


</style>