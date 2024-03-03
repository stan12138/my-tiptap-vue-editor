<!-- 点击Columns之后弹出的bubble menu -->
<template>
    <bubble-menu :tippyOptions="tippyOptions" pluginKey="ColumnsMenu" :shouldShow="shouldShow" :editor="props.editor" style="padding: 0.35rem; border: 1px solid rgb(229, 229, 229); background-color: white; border-radius: 0.5rem">
        <ToolTipWrapper tip="sidebar left">
            <n-button strong secondary style="vertical-align: middle; padding-left: 6px; padding-right: 6px; margin-left: 1px; margin-right: 1px;" :class="{'is-active': checkActive('sidebar-left')}" @click="props.editor.chain().focus().setLayout('sidebar-left').run()">
                <template #icon>
                    <n-icon><PanelLeft24Regular /></n-icon>
                </template>
            </n-button>
        </ToolTipWrapper>
        <ToolTipWrapper tip="tow columns">
            <n-button strong secondary style="vertical-align: middle; padding-left: 6px; padding-right: 6px; margin-left: 1px; margin-right: 1px;" :class="{'is-active': checkActive('two-column')}" @click="props.editor.chain().focus().setLayout('two-column').run()">
                <template #icon>
                    <n-icon><LayoutColumns/></n-icon>
                </template>
            </n-button>
        </ToolTipWrapper>
        <ToolTipWrapper tip="sidebar right">
            <n-button strong secondary style="vertical-align: middle; padding-left: 6px; padding-right: 6px; margin-left: 1px; margin-right: 1px;" :class="{'is-active': checkActive('sidebar-right')}" @click="props.editor.chain().focus().setLayout('sidebar-right').run()">
                <template #icon>
                    <n-icon><PanelRight24Regular/></n-icon>
                </template>
            </n-button>
        </ToolTipWrapper>
    </bubble-menu>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { BubbleMenu, getAttributes } from '@tiptap/vue-3'
import { PanelLeft24Regular, PanelRight24Regular} from '@vicons/fluent'
import { LayoutColumns } from '@vicons/tabler'
import ToolTipWrapper from '../../../tooltipwrapper/ToolTipWrapper.vue'

const props = defineProps(['editor'])

const unLockRatio = ref(false)

const shouldShow = ({view, from}) => {
    console.log(view.state?.selection?.node?.type?.name, from, view)
    // 此处直接检查isActive会有一次错误出现menu
    if(props.editor.isActive('columns')) {
        return true;
    }
    // if(view.state?.selection?.node?.type?.name == 'imageBlock') {
    //     return true;
    // }
    return false;

}

const checkActive = (label) => {
    return props.editor.isActive('columns', { layout: label })
    // console.log(props.editor.getAttributes('imageBlock'), props.editor.isActive('imageBlock', {'align': label}), label)
    // return props.editor.isActive('imageBlock', {'align': label})
}


const tippyOptions = ref({
    'maxWidth': 'auto',
    'zIndex': 20,
    'appendTo': 'parent'
})

</script>

<style scoped>
:deep() .n-button {
    background-color: white;
}

/* Editor中的样式设置了所有按钮的背景色是白色，这里重新设置一下is-active保证is-active优先级最高，生效选中效果 */
:deep() .is-active {
    background-color: rgba(0, 0, 0, 0.1);
}

:deep() .n-input-wrapper {
    padding-left: 2px;
    padding-right: 2px;
}

:deep() .n-input {
    margin-left: 6px;
    margin-right: 10px;
}

</style>