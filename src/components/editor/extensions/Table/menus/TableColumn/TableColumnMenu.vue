<template>
    <bubble-menu :tippyOptions="tippyOptions" pluginKey="tableColumnMenu" :shouldShow="shouldShow" :editor="props.editor" style="padding: 0.35rem; border: 1px solid rgb(229, 229, 229); background-color: white; border-radius: 0.5rem">
        <div>
            <div>
                <n-button icon-placement="left" secondary strong @click="props.editor.chain().focus().addColumnBefore().run()">
                    <template #icon>
                        <n-icon>
                            <ArrowBarToLeft />
                        </n-icon>
                    </template>
                    Add column before
                </n-button>
            </div>
            <div style="width: 100%;">
                <n-button icon-placement="left" align-icon="left" align-text="left" secondary strong style="width: 100%;" class="left-align-button" @click="props.editor.chain().focus().addColumnAfter().run()">
                    <template #icon>
                        <n-icon>
                            <ArrowBarToRight />
                        </n-icon>
                    </template>
                    Add column after
                </n-button>
            </div>

            <div style="width: 100%;">
                <n-button icon-placement="left" secondary strong style="width: 100%;" class="left-align-button" @click="props.editor.chain().focus().deleteColumn().run()">
                    <template #icon>
                        <n-icon>
                            <Trash />
                        </n-icon>
                    </template>
                    Delete column
                </n-button>
            </div>

            <div style="width: 100%;">
                <n-button icon-placement="left" secondary strong style="width: 100%;" class="left-align-button" @click="props.editor.commands.deleteTable().run()">
                    <template #icon>
                        <n-icon color="#ce606f">
                            <Trash />
                        </n-icon>
                    </template>
                    Delete Table
                </n-button>
            </div>

        </div>
    </bubble-menu>
</template>

<script setup lang="ts">
import { ArrowBarToLeft, ArrowBarToRight, Trash } from '@vicons/tabler'
import { ref } from 'vue'
import { BubbleMenu, getAttributes } from '@tiptap/vue-3'
import { isColumnGripSelected } from './utils.ts'

const props = defineProps(['editor'])

const tippyOptions = ref({
    'offset': [0, 15],
    'appendTo': 'parent',
    "popperOptions": {
        'modifiers': [{ 'name': 'flip', 'enabled': false }],
    }
})

const shouldShow = ({view, state, from}) => {
    if(!state) {
        return false
    }
    return isColumnGripSelected(props.editor, view, state, from)
}


</script>

<style scoped>
:deep() .n-button {
    background-color: white;
}

/* 自定义样式，让按钮内的内容靠左 */
.left-align-button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
/* 可能需要调整文本和图标之间的间距 */
.left-align-button > *:not(:last-child) {
  margin-right: 8px; /* 根据需要调整间距 */
}

</style>