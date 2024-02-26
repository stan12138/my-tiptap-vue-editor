// import { Group } from './types.ts'
import { H1, H2, H3, List, ListNumbers, ListCheck, Quote, FileCode, Columns, Minus, Book2  } from '@vicons/tabler'
import { Table32Regular, Image24Regular } from '@vicons/fluent'
import { markRaw } from 'vue';

export const GROUPS = [
  {
    name: 'format',
    title: 'Format',
    commands: [
      {
        name: 'heading1',
        label: 'Heading 1',
        iconName: markRaw(H1),
        description: 'High priority section title',
        aliases: ['h1'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 1 }).run()
        },
      },
      {
        name: 'heading2',
        label: 'Heading 2',
        iconName: markRaw(H2),
        description: 'Medium priority section title',
        aliases: ['h2'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 2 }).run()
        },
      },
      {
        name: 'heading3',
        label: 'Heading 3',
        iconName: markRaw(H3),
        description: 'Low priority section title',
        aliases: ['h3'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 3 }).run()
        },
      },
      {
        name: 'bulletList',
        label: 'Bullet List',
        iconName: markRaw(List),
        description: 'Unordered list of items',
        aliases: ['ul'],
        action: editor => {
          editor.chain().focus().toggleBulletList().run()
        },
      },
      {
        name: 'numberedList',
        label: 'Numbered List',
        iconName: markRaw(ListNumbers),
        description: 'Ordered list of items',
        aliases: ['ol'],
        action: editor => {
          editor.chain().focus().toggleOrderedList().run()
        },
      },
      {
        name: 'taskList',
        label: 'Task List',
        iconName: markRaw(ListCheck),
        description: 'Task list with todo items',
        aliases: ['todo'],
        action: editor => {
          editor.chain().focus().toggleTaskList().run()
        },
      },
      {
        name: 'blockquote',
        label: 'Blockquote',
        iconName: markRaw(Quote),
        description: 'Element for quoting',
        action: editor => {
          editor.chain().focus().setBlockquote().run()
        },
      },
      {
        name: 'codeBlock',
        label: 'Code Block',
        iconName: markRaw(FileCode),
        description: 'Code block with syntax highlighting',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor.chain().focus().setCodeBlock().run()
        },
      },
    ],
  },
  {
    name: 'insert',
    title: 'Insert',
    commands: [
      {
        name: 'table',
        label: 'Table',
        iconName: markRaw(Table32Regular),
        description: 'Insert a table',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        },
      },
      {
        name: 'image',
        label: 'Image',
        iconName: markRaw(Image24Regular),
        description: 'Insert an image',
        aliases: ['img'],
        action: editor => {
          editor.chain().focus().setImageUpload().run()
        },
      },
    //   {
    //     name: 'columns',
    //     label: 'Columns',
    //     iconName: markRaw(Columns),
    //     description: 'Add two column content',
    //     aliases: ['cols'],
    //     shouldBeHidden: editor => editor.isActive('columns'),
    //     action: editor => {
    //       editor
    //         .chain()
    //         .focus()
    //         .setColumns()
    //         .focus(editor.state.selection.head - 1)
    //         .run()
    //     },
    //   },
      {
        name: 'horizontalRule',
        label: 'Horizontal Rule',
        iconName: markRaw(Minus),
        description: 'Insert a horizontal divider',
        aliases: ['hr'],
        action: editor => {
          editor.chain().focus().setHorizontalRule().run()
        },
      },
    //   {
    //     name: 'toc',
    //     label: 'Table of Contents',
    //     iconName: markRaw(Book2),
    //     aliases: ['outline'],
    //     description: 'Insert a table of contents',
    //     shouldBeHidden: editor => editor.isActive('columns'),
    //     action: editor => {
    //       editor.chain().focus().insertTableOfContent().run()
    //     },
    //   }
    ],
  },
]

export default GROUPS
