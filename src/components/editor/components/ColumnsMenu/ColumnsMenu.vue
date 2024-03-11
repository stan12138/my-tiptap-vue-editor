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
        <n-divider vertical style="margin: 0;"></n-divider>
        <ToolTipWrapper tip="delete">
            <n-button strong secondary type="error" style="vertical-align: middle; padding-left: 6px; padding-right: 6px; margin-left: 1px; margin-right: 1px;" @click="deleteColumns">
                <template #icon>
                    <n-icon><Trash/></n-icon>
                </template>
            </n-button>
        </ToolTipWrapper>
    </bubble-menu>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Trash  } from '@vicons/tabler'
import { BubbleMenu, getAttributes } from '@tiptap/vue-3'
import { PanelLeft24Regular, PanelRight24Regular} from '@vicons/fluent'
import { LayoutColumns } from '@vicons/tabler'
import ToolTipWrapper from '../../../tooltipwrapper/ToolTipWrapper.vue'
import getRenderContainer from '../../utils/getRenderContainer.ts'

const props = defineProps(['editor'])

const unLockRatio = ref(false)

const shouldShow = ({view, from}) => {
    // console.log(view.state?.selection?.node?.type?.name, from, view)
    // 此处直接检查isActive会有一次错误出现menu
    if(props.editor.isActive('columns')) {
        return true;
    }
    // const $myPos = props.editor.$pos($from.pos-1)
    // console.log(props.editor.$pos(view.state?.selection?.$from.pos-1).node.type.name)
    // if(view.state?.selection?.node?.type?.name == 'columns') {
    //     return true;
    // }
    return false;

}

const checkActive = (label) => {
    return props.editor.isActive('columns', { layout: label })
    // console.log(props.editor.getAttributes('imageBlock'), props.editor.isActive('imageBlock', {'align': label}), label)
    // return props.editor.isActive('imageBlock', {'align': label})
}

const getReferenceClientRect = () => {
    const renderContainer = getRenderContainer(props.editor, 'columns')
    const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0)
    return rect
}

const tippyOptions = ref({
    'maxWidth': 'auto',
    'zIndex': 20,
    'appendTo': 'parent',
    "popperOptions": {
        'modifiers': [{ 'name': 'flip', 'enabled': false }],
    },
    "getReferenceClientRect": getReferenceClientRect, //用于始终固定menu的位置
    // "plugins": [sticky],
    // "sticky": 'popper'
})

const deleteColumns = () => {
    // 其实我并不明白此处是怎么工作的，但是暂时算是有效的吧
    let paragraph = props.editor.state.selection.$anchor.parent
    const { $from, empty } = props.editor.state.selection
    const $myPos = props.editor.$pos($from.pos-1)
    const columns = $myPos.parent
    props.editor.chain().setNodeSelection(columns.pos-1).deleteSelection().run()
    // console.log(columns)
}

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