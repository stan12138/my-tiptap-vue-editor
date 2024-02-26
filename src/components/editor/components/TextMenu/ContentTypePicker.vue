<!-- 
    内容选择器
-->
<template>
    <n-dropdown :options="options" trigger="click" @select="handleSelect">
        <!-- 设置vertical-align可以有效解决设置两个图标导致按钮位置上移问题 -->
        <n-button secondary strong icon-placement="right" style="vertical-align: middle; padding-left: 6px; padding-right: 6px; margin-left: 1px; margin-right: 1px;" :class="{'is-active': !(findActiveTag()=='Paragraph')}">
            <n-icon size="20" :component="iconMap[findActiveTag()]"/>
            <!-- <template #icon> -->
                <n-icon size="17" style="vertical-align: middle;">
                    <KeyboardArrowDownRound/>
                </n-icon>
            <!-- </template> -->
            
            <!-- Content -->
        </n-button>
    </n-dropdown>
</template>

<script setup lang="ts">
import { KeyboardArrowDownRound } from '@vicons/material'
import { h, ref } from 'vue'
import type { Component } from 'vue' 
import { NIcon } from 'naive-ui'
import {
    TextParagraph16Regular as ParaIcon,
    TextHeader124Filled as H1Icon,
    TextHeader224Filled as H2Icon,
    TextHeader324Filled as H3Icon,
    TextBulletListLtr20Filled as BulletIcon,
    TextNumberListLtr20Filled as NumListIcon,
    TaskListLtr20Filled as TaskIcon
} from '@vicons/fluent'

const props = defineProps(['editor'])

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

const iconMap = {
    "Paragraph": ParaIcon, "H1": H1Icon, "H2": H2Icon, "H3": H3Icon, "BulletList": BulletIcon, "NumList": NumListIcon, "TodoList": TaskIcon
}

const chooseOptions = [
    {
        type: 'group',
        label: 'HIERARCHY',
        key: 'main',
        children: [
            {
                label: 'Paragraph',
                key: 'Paragraph',
                icon: renderIcon(ParaIcon),
                isActive: () => props.editor.isActive('paragraph') && !props.editor.isActive('orderedList') && !props.editor.isActive('bulletList') && !props.editor.isActive('taskList')
            },
            {
                label: 'Heading 1',
                key: 'H1',
                icon: renderIcon(H1Icon),
                isActive: () => props.editor.isActive('heading', { level: 1 }),
            },
            {
                label: 'Heading 2',
                key: 'H2',
                icon: renderIcon(H2Icon),
                isActive: () => props.editor.isActive('heading', { level: 2 }),
            },
            {
                label: 'Heading 3',
                key: 'H3',
                icon: renderIcon(H3Icon),
                isActive: () => props.editor.isActive('heading', { level: 3 }),
            }
        ]
    },
    {
        type: 'group',
        label: 'LISTS',
        key: 'second',
        children: [
            {
                label: 'Bullet list',
                key: 'BulletList',
                icon: renderIcon(BulletIcon),
                isActive: () => props.editor.isActive('bulletList'),
            },
            {
                label: 'Numbered list',
                key: 'NumList',
                icon: renderIcon(NumListIcon),
                isActive: () => props.editor.isActive('orderedList'),
            },
            {
                label: 'Todo list',
                key: 'TodoList',
                icon: renderIcon(TaskIcon),
                isActive: () => props.editor.isActive('taskList'),
            }
        ]
    }
]
const options = ref(chooseOptions)

const handleSelect = (key: string) => {
    if(key == "Paragraph") {
        props.editor.chain().focus().setParagraph().run()
    } else if(key == "H1") {
        props.editor.chain().focus().toggleHeading({ level: 1 }).run()
    } else if(key == "H2") {
        props.editor.chain().focus().toggleHeading({ level: 2 }).run()
    } else if(key == "H3") {
        props.editor.chain().focus().toggleHeading({ level: 3 }).run()
    } else if(key == "BulletList") {
        props.editor.chain().focus().toggleBulletList().run()
    } else if(key == "NumList") {
        props.editor.chain().focus().toggleOrderedList().run()
    } else if(key == "TodoList") {
        props.editor.chain().focus().toggleTaskList().run()
    }
}

const findActiveTag = () => {
    for(let index=0; index<chooseOptions.length; index++) {
        let group = chooseOptions[index];
        if ("children" in group) {
            for(let item_index=0; item_index<group.children.length; item_index++) {
                if(group.children[item_index].isActive()) {
                    return group.children[item_index].key
                }
            }
        }
    }
    return "Paragraph"
}

</script>

<style scoped>
:deep() .content-button {
    padding-left: 6px;
    padding-right: 6px;
    top: 4px;
}
</style>