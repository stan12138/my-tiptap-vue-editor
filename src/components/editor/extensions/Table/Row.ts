import TableRow from '@tiptap/extension-table-row'

export const MyTableRow = TableRow.extend({
  allowGapCursor: false,
  content: 'tableCell*',
})

export default MyTableRow
