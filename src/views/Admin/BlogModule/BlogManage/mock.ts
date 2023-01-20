import { JTableDataType } from '@/components/JTable/type'

export const mockQueryTableData = (): Promise<JTableDataType> => {
  return new Promise((resolve) => {
    resolve([
      { id: 1, blogName: 'Blog NO 1', category: 'Node', publishTime: '2023-01-03', visibility: 0 },
      { id: 2, blogName: 'Blog NO 2', category: 'Node', publishTime: '2023-01-04', visibility: 1 },
      { id: 3, blogName: 'Blog NO 1', category: 'Node', publishTime: '2023-01-03', visibility: 1 },
      { id: 4, blogName: 'Blog NO 1', category: 'Node', publishTime: '2023-01-03', visibility: 0 }
    ])
  })
}
