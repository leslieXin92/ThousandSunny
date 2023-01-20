import { JTableDataType } from '@/components/JTable/type'

export const mockQueryTableData = (): Promise<JTableDataType> => {
  return new Promise((resolve) => {
    resolve([
      { id: 1, date: '2023-01-03', taskName: 'node' },
      { id: 2, date: '2023-01-04', taskName: 'webpack' },
      { id: 3, date: '2023-01-03', taskName: 'mini-vue3' },
      { id: 4, date: '2023-01-03', taskName: 'react' }
    ])
  })
}
