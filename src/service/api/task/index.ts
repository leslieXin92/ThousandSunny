import JRequest from '@/service'
import { IData } from '@/service/api/type'
import { IEditTaskParams, IGetTaskRes } from './type'

// 新增Task
export function createTask() {
  return JRequest.post<IData>({
    url: '/task',
    showLoading: true
  })
}

// 删除Task

// 编辑Task
export function editTask(taskInfo: IEditTaskParams) {
  return JRequest.put<IData>({
    url: '/task',
    data: taskInfo
  })
}

// 获取Task
export function getTask(date: string) {
  return JRequest.get<IData<IGetTaskRes>>({
    url: `/task/${date}`,
    showLoading: true
  })
}
