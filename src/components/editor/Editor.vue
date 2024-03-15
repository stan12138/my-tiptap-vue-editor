<template>
    <div style="min-height: 1500px;">
        <TextMenu v-if="editor" :editor="editor"></TextMenu>
        <LinkMenu v-if="editor" :editor="editor"></LinkMenu>
        <ImageBlockMenu v-if="editor" :editor="editor"></ImageBlockMenu>
        <ColumnsMenu v-if="editor" :editor="editor"></ColumnsMenu>
        <TableColumnMenu v-if="editor" :editor="editor"></TableColumnMenu>
        <TableRowMenu v-if="editor" :editor="editor"></TableRowMenu>
        <editor-content v-if="editor" :editor="editor" style="min-height: 500px;"/>
    </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'
import { Color } from '@tiptap/extension-color'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import Focus from '@tiptap/extension-focus'
// import Table from '@tiptap/extension-table'
// import TableCell from '@tiptap/extension-table-cell'
// import TableHeader from '@tiptap/extension-table-header'
// import TableRow from '@tiptap/extension-table-row'
import FileHandler from '@tiptap-pro/extension-file-handler'
import Emoji, { gitHubEmojis } from '@tiptap-pro/extension-emoji'
import Paragraph from '@tiptap/extension-paragraph'
import { Mathematics } from '@tiptap-pro/extension-mathematics'  // latex
import 'katex/dist/katex.min.css'  // latex
import {common, createLowlight} from 'lowlight'

import LiteralTab from './extensions/LiteralTab/LiteralTab.ts'
import FontSize from './extensions/FontSize/FontSize.ts'
import SlashCommand from './extensions/SlashCommand/SlashCommand.ts'
import ImageUpload from './extensions/ImageUpload/ImageUpload.ts'
import ImageBlock from './extensions/ImageBlock/ImageBlock.ts'
import suggestion from './extensions/EmojiSuggestion/EmojiSuggestion.ts'
import Columns from "./extensions/MultiColumn/Columns.ts"
import Column from "./extensions/MultiColumn/Column.ts"
import Document from "./extensions/Document/Document.ts"
import DragHandle from './extensions/DragHandle/DragHandle.js'
import Paper from './extensions/Paper/Paper.ts'

import MyTable from './extensions/Table/Table.ts'
import TableCell from './extensions/Table/Cell.ts'
import MyTableHeader from './extensions/Table/Header.ts'
import MyTableRow from './extensions/Table/Row.ts'

import MapBlock from './extensions/MapBlock/MapBlock.ts'

import TableColumnMenu from './extensions/Table/menus/TableColumn/TableColumnMenu.vue'
import TableRowMenu from './extensions/Table/menus/TableRow/TableRowMenu.vue'

import TextMenu from './components/TextMenu/TextMenu.vue'
import LinkMenu from './components/LinkMenu/LinkMenu.vue'
import ImageBlockMenu from './components/ImageBlockMenu/ImageBlockMenu.vue'
import ColumnsMenu from './components/ColumnsMenu/ColumnsMenu.vue'

import { Request } from '../../plugins/request.ts'

const lowlight = createLowlight(common)

const d = 'I’ve seen things you people wouldn’t believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhauser gate. All those moments will be lost in time... like tears in rain...Time to die.'

const emit = defineEmits(["update"]);

const props = defineProps(["content"])

const editor = useEditor({
    content: props.content,
    extensions: [
        Document,   // fuck!!!! columns自定义扩展需要
        StarterKit.configure({
            codeBlock: false,
            paragraph: false,
            document: false,
        }),
        // DragHandle,
        // SlashCommand,
        CodeBlockLowlight.configure({   // 代码块，支持highlight
            lowlight,
            defaultLanguage: null,
        }),
        LiteralTab,     // 支持tab
        TaskList,    // 支持taskList
        TaskItem.configure({    // 支持taskList
          nested: true,
        }),
        TextStyle,   // 字体设置
        FontFamily, // 字体设置
        FontSize, // 支持字号设置
        Underline, // 支持下划线
        Link.configure({    // 支持链接
          openOnClick: false,
        }),
        Highlight.configure({ multicolor: true }), // 支持高亮
        Color,  // 支持设置文字颜色
        Subscript, // 支持下标
        Superscript, // 支持上标
        TextAlign.configure({     // 支持对齐
          types: ['heading', 'paragraph'],
        }),
        Placeholder.configure({   // 支持占位符样式
            includeChildren: true,
            showOnlyCurrent: false,
            placeholder: ({ node }) => {
            if (node.type.name === 'heading') {
              return 'What’s the title?'
            }

            return ''
          },
        }),
        SlashCommand,   // slash命令
        Focus,   // 用于提供has-focus css class，配合placeholder实现placeholder的设置
        // Table.configure({   // 支持表格 --> 
        //   resizable: true,
        // }),
        // TableCell,
        // TableHeader,
        // TableRow,   // <-- 支持表格
        MyTable,   // 支持表格 --> 
        TableCell,
        MyTableHeader,
        MyTableRow,   // <-- 支持表格
        ImageUpload, // 图片上传
        ImageBlock,  // 图片展示
        FileHandler.configure({    // 支持拖拽，粘贴图片到编辑器
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
            onDrop: (currentEditor, files, pos) => {
                files.forEach(file => {
                    Request.singleFilePost("http://127.0.0.1:10007/api/picture/upload_editor_picture", file as File).then((res: any) => {
                        currentEditor.chain().setImageBlock({ src: "http://127.0.0.1:10007" + res.data.url }).focus().run()
                    })
                })
            },
            onPaste: (currentEditor, files) => {
                files.forEach(file => {
                    Request.singleFilePost("http://127.0.0.1:10007/api/picture/upload_editor_picture", file as File).then((res: any) => {
                        currentEditor.chain().setImageBlock({ src: "http://127.0.0.1:10007" + res.data.url }).focus().run()
                    })
                })
            },
        }),
        Emoji.configure({       // 支持emoji
          emojis: gitHubEmojis,
          enableEmoticons: true,
          suggestion,
        }),
        Columns,  // 支持columns
        Column,  // 支持columns
        Paragraph,  // 支持columns，paragraph是一个很基础的extension
        Mathematics, // 支持latex
        // DragHandle,  // dragHandle目前效果不符合我的需求，等待官方支持
        Paper,    // 支持画板
        MapBlock, // 支持地图
    ],
    editable: true,
    editorProps: {
        attributes: {
            autocomplete: 'off',
            autocorrect: 'off',
            autocapitalize: 'off',
            class: 'new-editor',
        },
    },
    autofocus: true,
    onUpdate({editor}) {
        const content = editor.getJSON()
        const html = editor.getHTML()
        emit("update", content, html)
    },
    // onTransaction({ editor, transaction }) {
    //   console.log("ttttttttt")
    // },
})

const getContent = () => {
    return editor.getJSON()
}

</script>

<style scoped>
/* 设置编辑器的基本格式 */
:deep() .new-editor {
    background-color: white;
    padding: 20px;
    min-height: 1500px;
    outline: unset;
    font-size: 16px;
    color: rgba(46, 52, 64, 0.87);
    line-height: 1.625;
    font-feature-settings:"liga" 0;
    -webkit-text-size-adjust: 100%;
    /* font-variation-settings: normal; */
    font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
    /* font-family: -apple-system,BlinkMacSystemFont,Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji; */
}

/* 防止bubble menu过窄导致换行 */
:deep() .tippy-box {
    max-width: unset !important;
}

</style>
<style lang="scss">
// 编辑器基本样式，不能是scope
.tiptap {
  > * + * {
    margin-top: 0.75em;
  }
}

.is-active {
    background-color: rgba($color: #000000, $alpha: 0.1);
}

input[type="checkbox"] {
  margin-right: 4px;
}
</style>

<style lang="scss">
// 编辑器taskList样式，不能是scope
ul[data-type="taskList"] {
    list-style: none;
    padding: 0;
  
    p {
      margin: 0;
    }
  
    li {
      display: flex;
  
      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }
  
      > div {
        flex: 1 1 auto;
      }
  
      ul li,
      ol li {
        display: list-item;
      }
  
      ul[data-type="taskList"] > li {
        display: flex;
      }
    }
  }

blockquote {
    padding-left: 1rem;
    border-left: 3px solid rgba(#0D0D0D, 0.1);
}

</style>

<!-- <style lang="scss">
// 表格样式
.tiptap {
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: "";
      left: 0; right: 0; top: 0; bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }

    p {
      margin: 0;
    }
  }
}

.tableWrapper {
  padding: 1rem 0;
  overflow-x: auto;
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}
</style> -->

<style>
/* imageblock样式 */
.ProseMirror .node-imageBlock img {
    overflow: hidden;
    border-radius: .75rem;
    border-width: 2px;
    border-color: transparent
}

.ProseMirror .node-imageBlock:hover img {
    border-width: 2px;
    --tw-border-opacity: 1;
    border-color: rgb(245 245 245/var(--tw-border-opacity))
}
.ProseMirror img {
    height: auto;
    width: 100%;
    max-width: 100%
}

</style>

<style>
/* columns样式 */
.ProseMirror [data-type=columns] {
    /* margin-top: 3.5rem;
    margin-bottom: 3rem; */
    display: grid;
    gap: 1rem
}

.ProseMirror [data-type=columns].layout-sidebar-left {
    grid-template-columns: 40fr 60fr;
}

.ProseMirror [data-type=columns].layout-sidebar-right {
    grid-template-columns: 60fr 40fr
}

.ProseMirror [data-type=columns].layout-two-column {
    grid-template-columns: 1fr 1fr
}

.ProseMirror [data-type=column] {
    overflow: auto
}

.ProseMirror [data-type=columns].has-focus [data-type=column],.ProseMirror [data-type=columns]:hover [data-type=column] {
    --tw-border-opacity: 1;
    border-color: rgb(212 212 212/var(--tw-border-opacity))
}

:is(.dark .ProseMirror [data-type=columns].has-focus [data-type=column]),:is(.dark .ProseMirror [data-type=columns]:hover [data-type=column]) {
    --tw-border-opacity: 1;
    border-color: rgb(64 64 64/var(--tw-border-opacity))
}

.ProseMirror [data-type=columns] [data-type=column].has-focus {
    --tw-border-opacity: 1;
    border-color: rgb(163 163 163/var(--tw-border-opacity))
}

:is(.dark .ProseMirror [data-type=columns] [data-type=column].has-focus) {
    --tw-border-opacity: 1;
    border-color: rgb(82 82 82/var(--tw-border-opacity))
}

.ProseMirror [data-type=column] {
    border-radius: .25rem;
    border: 2px dotted transparent;
    padding: .25rem;
    transition: border .16s cubic-bezier(.45,.05,.55,.95)
}

.ProseMirror [data-type=column]:hover {
    --tw-border-opacity: 1;
    border-color: rgb(245 245 245/var(--tw-border-opacity))
}

:is(.dark .ProseMirror [data-type=column]:hover) {
    --tw-border-opacity: 1;
    border-color: rgb(23 23 23/var(--tw-border-opacity))
}

.ProseMirror [data-type=column].has-focus,.ProseMirror [data-type=column]:has(.is-active) {
    --tw-border-opacity: 1;
    border-color: rgb(245 245 245/var(--tw-border-opacity))
}

:is(.dark .ProseMirror [data-type=column].has-focus),:is(.dark .ProseMirror [data-type=column]:has(.is-active)) {
    --tw-border-opacity: 1;
    border-color: rgb(23 23 23/var(--tw-border-opacity))
}
</style>

<style lang="scss">
/* 首行placeholder样式 */
.tiptap .is-empty::before {
  content: attr(data-placeholder);
  float: left;
  color: #ced4da;
  pointer-events: none;
  height: 0;
}
</style>


<style lang="scss">
/* 数学公式样式 */
.ProseMirror {
  .Tiptap-mathematics-editor {
    background: #202020;
    color: #fff;
    font-family: monospace;
    padding: 0.2rem 0.5rem;
  }

  .Tiptap-mathematics-render {
    cursor: pointer;
    padding: 0 0.25rem;
    transition: background 0.2s;

    &:hover {
      background: #eee;
    }
  }

  .Tiptap-mathematics-editor,
  .Tiptap-mathematics-render {
    border-radius: 0.25rem;
    display: inline-block;
  }
}
</style>

<style lang="scss">
.global-drag-handle {
  position: absolute;

  &::after {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1.25rem;
    // content: '⠿';
    font-weight: 700;
    cursor: grab;
    background:#0D0D0D10;
    color: #0D0D0D50;
    border-radius: 0.25rem;
  }
}
</style>

<style>
/* 表格样式 */
.ProseMirror .tableWrapper {
  margin-top: 3rem; /* 对应 my-12 */
  margin-bottom: 3rem; /* 对应 my-12 */
}

.ProseMirror table {
  border-collapse: collapse;
  border: 1px solid rgba(0, 0, 0, 0.1); /* border-black/10 */
  border-radius: 0.25rem; /* rounded */
  box-sizing: border-box; /* box-border */
  width: 100%; /* w-full */
}

.ProseMirror table.dark {
  border-color: rgba(255, 255, 255, 0.2); /* dark:border-white/20 */
}

.ProseMirror table td,
.ProseMirror table th {
  border: 1px solid rgba(0, 0, 0, 0.1); /* border-black/10 */
  min-width: 100px; /* min-w-[100px] */
  padding: 0.5rem; /* p-2 */
  position: relative;
  text-align: left;
  vertical-align: top;
}

.ProseMirror table td.dark,
.ProseMirror table th.dark {
  border-color: rgba(255, 255, 255, 0.2); /* dark:border-white/20 */
}

.ProseMirror table td p,
.ProseMirror table th p {
  margin: 0; /* m-0 */
}

.ProseMirror table td p + p,
.ProseMirror table th p + p {
  margin-top: 0.75rem; /* mt-3 */
}

.ProseMirror table th {
  font-weight: bold; /* font-bold */
}

.ProseMirror table .column-resize-handle {
  bottom: -2px;
  display: flex;
  pointer-events: none;
  position: absolute;
  right: -0.25rem; /* -1px in Tailwind, adjusted for general CSS */
  top: 0;
  width: 0.5rem; /* w-2 */
}

.ProseMirror table .column-resize-handle::before {
  background-color: rgba(0, 0, 0, 0.2); /* bg-black/20 */
  height: 100%;
  width: 1px;
  margin-left: 0.5rem; /* ml-2 */
  content: '';
}

.ProseMirror table .column-resize-handle.dark::before {
  background-color: rgba(255, 255, 255, 0.2); /* dark:bg-white/20 */
}

.ProseMirror table .selectedCell {
  background-color: rgba(0, 0, 0, 0.05); /* bg-black/5 */
  border: 1px double rgba(0, 0, 0, 0.2); /* border-black/20, border-double */
}

.ProseMirror table .selectedCell.dark {
  background-color: rgba(255, 255, 255, 0.1); /* dark:bg-white/10 */
  border-color: rgba(255, 255, 255, 0.2); /* dark:border-white/20 */
}

.ProseMirror table .grip-column,
.ProseMirror table .grip-row {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.05); /* bg-black/5 */
  cursor: pointer;
  position: absolute;
  z-index: 10;
}

.ProseMirror table .grip-column.dark,
.ProseMirror table .grip-row.dark {
  background-color: rgba(255, 255, 255, 0.1); /* dark:bg-white/10 */
}

.ProseMirror table .grip-column {
  width: calc(100% + 1px);
  border-left: 1px solid rgba(0, 0, 0, 0.2); /* border-l border-black/20 */
  height: 0.75rem; /* h-3 */
  left: 0;
  margin-left: -1px; /* -ml-[1px] */
  top: -0.75rem; /* -top-3 */
}

.ProseMirror table .grip-column.dark {
  border-color: rgba(255, 255, 255, 0.2); /* dark:border-white/20 */
}

.ProseMirror table .grip-column:hover,
.ProseMirror table .grip-column.selected {
  background-color: rgba(0, 0, 0, 0.1); /* bg-black/10 on hover */
}

.ProseMirror table .grip-column:hover.dark,
.ProseMirror table .grip-column.selected.dark {
  background-color: rgba(255, 255, 255, 0.2); /* dark:bg-white/20 on hover */
}

.ProseMirror table .grip-column.first {
  border-color: transparent;
  border-top-left-radius: 0.125rem; /* rounded-tl-sm */
}

.ProseMirror table .grip-column.last {
  border-top-right-radius: 0.125rem; /* rounded-tr-sm */
}

.ProseMirror table .grip-column.selected {
  background-color: rgba(0, 0, 0, 0.3); /* bg-black/30 */
  border-color: rgba(0, 0, 0, 0.3); /* border-black/30 */
  box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.1); /* shadow-sm */
}

.ProseMirror table .grip-column.selected.dark {
  background-color: rgba(255, 255, 255, 0.3); /* dark:bg-white/30 */
  border-color: rgba(255, 255, 255, 0.3); /* dark:border-white/30 */
}

.ProseMirror table .grip-column.selected:hover::before {
    /* border-left-width: 2px;
    border-style: dotted; */
    content: '...';
    height: 0.625rem;
    position: absolute;
    top: -50%; /* 垂直居中 */
    transform: translateY(-50%); /* 确保垂直居中 */
    /* border: 0 solid #181818; */
}

.ProseMirror table .grip-row {
  height: calc(100% + 1px);
  border-top: 1px solid rgba(0, 0, 0, 0.2); /* border-t border-black/20 */
  left: -0.75rem; /* -left-3 */
  width: 0.75rem; /* w-3 */
  top: 0;
  margin-top: -1px; /* -mt-[1px] */
}

.ProseMirror table .grip-row.dark {
  border-color: rgba(255, 255, 255, 0.2); /* dark:border-white/20 */
}

.ProseMirror table .grip-row:hover,
.ProseMirror table .grip-row.selected {
  background-color: rgba(0, 0, 0, 0.1); /* bg-black/10 on hover */
}

.ProseMirror table .grip-row:hover.dark,
.ProseMirror table .grip-row.selected.dark {
  background-color: rgba(255, 255, 255, 0.2); /* dark:bg-white/20 on hover */
}

.ProseMirror table .grip-row.first {
  border-color: transparent;
  border-top-left-radius: 0.125rem; /* rounded-tl-sm */
}

.ProseMirror table .grip-row.last {
  border-bottom-left-radius: 0.125rem; /* rounded-bl-sm */
}

.ProseMirror table .grip-row.selected {
  /* background-color: rgba(0, 0, 0, 0.3); bg-black/30 */
  /* border-color: rgba(0, 0, 0, 0.3); border-black/30 */
  /* box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.1); shadow-sm */
  /* content: ''; */
}

.ProseMirror table .grip-row.selected::before {
    content: '⠿';
    height: 0.625rem;
    position: absolute;
    top: 20%;
    left: 50%; /* 垂直居中 */
    transform: translateX(-50%); /* 确保垂直居中 */
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}

</style>


<style>
/* 地图插件的样式，包括标记点和label */
.amap-icon img{
    width: 25px;
    height: 34px;
}

.amap-marker-label{
    border: 0;
    background-color: transparent;
}

.info {
  padding: .75rem 1.25rem;
  margin-bottom: 1rem;
  border-radius: .25rem;
  position: relative;
  margin:0;
  top: 0;
  right: 0;
  background-color: white;
  /* width: auto; */
  border-width: 0;
  /* width: 5rem; */
  white-space: normal;
  /* right: 1rem; */
  box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
}

</style>