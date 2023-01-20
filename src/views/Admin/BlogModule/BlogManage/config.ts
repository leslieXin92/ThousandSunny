import { ISchema } from '@/components/JForm/type'
import { JTableHeaderType } from '@/components/JTable/type'

export const schema: ISchema[] = [
  {
    component: 'input',
    key: 'blogName',
    itemAttrs: {
      label: 'blog name'
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
  },
  {
    component: 'select',
    key: 'visibility',
    itemAttrs: {
      label: 'visibility'
    },
    attrs: {
      placeholder: 'all',
      options: [
        { label: 'public', value: 0 },
        { label: 'private', value: 1 }
      ]
    }
  }
]

export const tableHeader: JTableHeaderType = [
  { attrs: { type: 'serialNumber', label: 'Serial Number', width: 130 } },
  { attrs: { prop: 'blogName', label: 'Blog Name' } },
  { attrs: { prop: 'category', label: 'Category' } },
  { attrs: { prop: 'publishTime', label: 'Publish Time' } },
  { attrs: { prop: 'visibility', label: 'Visibility' }, filterMap: { 0: 'public', 1: 'private' } },
  { attrs: { type: 'operate', label: 'Operation' } }
]
