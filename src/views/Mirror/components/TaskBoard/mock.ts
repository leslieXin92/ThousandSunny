export const mockGetTask = (date: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { taskId: 0, taskName: 'mysql', task: ['多表查询'] },
        { taskId: 1, taskName: 'node', task: ['mysql2的使用', 'ORM之sequelize'] },
        { taskId: 2, taskName: 'coderhub', task: ['封装errorType'] },
      ])
    }, 200)
  })
}
