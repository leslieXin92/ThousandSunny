export interface ITaskItem {
  id: number
  title: string
  content: string
  status: 'pending' | 'completed'
}

export interface IEditTaskParams {
  date: string
  taskList: ITaskItem[]
}

export interface IGetTaskRes {
  date: string
  taskList: ITaskItem[]
}
