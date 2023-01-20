import { JTableDataType } from '@/components/JTable/type'

export const mockQueryTableData = (): Promise<JTableDataType> => {
  return new Promise((resolve) => {
    resolve([
      {
        id: 1,
        projectName: 'Blog NO 1',
        technologyStack: 'Koa2',
        startTime: '2023-01-03',
        endTime: '2023-01-03',
        timeSpent: '30',
        onlineAddress: 'https://www.baidu.com'
      },
      {
        id: 2,
        projectName: 'Blog NO 2',
        technologyStack: 'Koa2',
        startTime: '2023-01-04',
        endTime: '2023-01-04',
        timeSpent: '30',
        onlineAddress: 'https://www.baidu.com'
      },
      {
        id: 3,
        projectName: 'Blog NO 1',
        technologyStack: 'Koa2',
        startTime: '2023-01-03',
        endTime: '2023-01-03',
        timeSpent: '30',
        onlineAddress: 'https://www.baidu.com'
      },
      {
        id: 4,
        projectName: 'Blog NO 1',
        technologyStack: 'Koa2',
        startTime: '2023-01-03',
        endTime: '2023-01-03',
        timeSpent: '30',
        onlineAddress: 'https://www.baidu.com'
      }
    ])
  })
}
