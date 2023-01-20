import { ISchema } from '@/components/JForm/type'
import { JTableHeaderType } from '@/components/JTable/type'

export const schema: ISchema[] = [
  {
    component: 'input',
    key: 'projectName',
    itemAttrs: {
      label: 'project name'
    },
    attrs: {}
  },
  {
    component: 'select',
    key: 'publishYear',
    itemAttrs: {
      label: 'publish year'
    },
    attrs: {
      placeholder: 'all',
      options: []
    }
  }
]

export const tableHeader: JTableHeaderType = [
  { attrs: { type: 'serialNumber', label: 'Serial Number' } },
  { attrs: { prop: 'projectName', label: 'Project Name' } },
  { attrs: { prop: 'technologyStack', label: 'Technology Stack' } },
  { attrs: { prop: 'startTime', label: 'Start Time' } },
  { attrs: { prop: 'endTime', label: 'End Time' } },
  { attrs: { prop: 'timeSpent', label: 'Time Spent' } },
  { attrs: { prop: 'onlineAddress', label: 'Online Address' }, custom: true },
  { attrs: { type: 'operate', label: 'Operation' } }
]
