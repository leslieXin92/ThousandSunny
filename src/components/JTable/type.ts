type JTableHeaderItemAttrsType =
  | {
  prop: string
  label: String
  [attrs: string]: any
} | {
  type?: string
  [attrs: string]: any
}

type JTableHeaderItemType = {
  attrs: JTableHeaderItemAttrsType
  custom?: boolean
  customHeader?: boolean
  filterMap?: Record<any, any>
  filterFn?: (data: any) => any
}

export type JTableHeaderType = JTableHeaderItemType[]

export type JTableDataType = Record<string, any>[]

// const tableHeader = [
//   { attrs: { type: 'selection', width: '50', align: 'center' } },
//   { attrs: { prop: 'order', label: '序号' }, custom: true },
//   { attrs: { prop: 'username', label: '用户名' } },
//   { attrs: { prop: 'password', label: '密码' } },
//   { attrs: { prop: 'coop', label: '操作' }, custom: true }
// ]

// const tableData = [
//   { order: '1', username: '1', password: '1', coop: '1' },
//   { order: '1', username: '1', password: '1', coop: '1' },
//   { order: '1', username: '1', password: '1', coop: '1' }
// ]
