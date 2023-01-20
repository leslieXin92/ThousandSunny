import { ISchema } from '@/components/JForm/type'
import { JTableHeaderType } from '@/components/JTable/type'

export const schema: ISchema[] = [
  {
    component: 'input',
    key: 'taskName',
    itemAttrs: {
      label: 'Task Name'
    },
    attrs: {}
  },
  {
    component: 'datePicker',
    key: 'date',
    itemAttrs: {
      label: 'Date'
    },
    attrs: {
      type: 'daterange',
      rangeSeparator: '-',
      startPlaceholder: 'Start date',
      endPlaceholder: 'End date'
    }
  }
]

export const tableHeader: JTableHeaderType = [
  { attrs: { type: 'serialNumber', label: 'Serial Number', width: 150 } },
  { attrs: { prop: 'date', label: 'Date' } },
  { attrs: { prop: 'taskName', label: 'Task Name' } },
  { attrs: { prop: 'taskDetails', label: 'Task Details' }, custom: true },
  { attrs: { type: 'operate', label: 'Operation' } }
]
