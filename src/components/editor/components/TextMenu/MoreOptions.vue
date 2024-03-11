<template>
    <n-tooltip trigger="hover">
        <template #trigger>
            <n-popover trigger="click">
                <template #trigger>
                    <n-button strong secondary style="vertical-align: middle; padding-left: 6px; padding-right: 6px; margin-left: 1px; margin-right: 1px;">
                        <template #icon>
                            <n-icon><MoreVertical20Regular/></n-icon>
                        </template>
                    </n-button>
                </template>
                <n-button strong secondary style="padding-left: 8px; padding-right: 8px; margin-right: 2px;" @click="click_button('subscript')" :class="{'is-active': props.editor.isActive('subscript')}">
                    <template #icon>
                        <n-icon><Subscript/></n-icon>
                    </template>
                </n-button>
                <n-button strong secondary style="padding-left: 8px; padding-right: 8px; margin-left: 2px; margin-right: 2px;" @click="click_button('superscript')" :class="{'is-active': props.editor.isActive('superscript')}">
                    <template #icon>
                        <n-icon><Superscript/></n-icon>
                    </template>
                </n-button>
                <n-divider vertical style="margin: 0; bottom: 4px"></n-divider>
                <n-button strong secondary style="padding-left: 8px; padding-right: 8px; margin-left: 2px; margin-right: 2px;" @click="click_button('left')" :class="{'is-active': props.editor.isActive({textAlign: 'left'})}">
                    <template #icon>
                        <n-icon><TextAlignLeft20Filled/></n-icon>
                    </template>
                </n-button>
                <n-button strong secondary style="padding-left: 8px; padding-right: 8px; margin-left: 2px; margin-right: 2px;" @click="click_button('center')" :class="{'is-active': props.editor.isActive({textAlign: 'center'})}">
                    <template #icon>
                        <n-icon><TextAlignCenter20Filled/></n-icon>
                    </template>
                </n-button>
                <n-button strong secondary style="padding-left: 8px; padding-right: 8px; margin-left: 2px; margin-right: 2px;" @click="click_button('right')" :class="{'is-active': props.editor.isActive({textAlign: 'right'})}">
                    <template #icon>
                        <n-icon><TextAlignRight20Filled/></n-icon>
                    </template>
                </n-button>
                <n-button strong secondary style="padding-left: 8px; padding-right: 8px; margin-left: 2px;" @click="click_button('justify')" :class="{'is-active': props.editor.isActive({textAlign: 'justify'})}">
                    <template #icon>
                        <n-icon><TextAlignJustify20Filled/></n-icon>
                    </template>
                </n-button>
            </n-popover>
        </template>
        More Options
    </n-tooltip>
</template>

<script setup lang="ts">
import { TextAlignLeft20Filled, TextAlignCenter20Filled, TextAlignRight20Filled, TextAlignJustify20Filled, MoreVertical20Regular } from '@vicons/fluent'
import { Subscript, Superscript } from '@vicons/tabler'
const props = defineProps(['editor'])

const click_button = (label: string) => {
    if(label == 'subscript') {
        props.editor.chain().focus().toggleSubscript().run()
    } else if(label == 'superscript') {
        props.editor.chain().focus().toggleSuperscript().run()
    } else if(label == 'left') {
        props.editor.chain().focus().setTextAlign('left').run()
    } else if(label == 'center') {
        props.editor.chain().focus().setTextAlign('center').run()
    } else if(label == 'right') {
        props.editor.chain().focus().setTextAlign('right').run()
    } else if(label == 'justify') {
        props.editor.chain().focus().setTextAlign('justify').run()
    }
}

</script>

<style scoped>

</style>