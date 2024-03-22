import http from '@/service/axios/http'
import type { Res } from '@/service/axios/type'
import type { ProjectItem } from '@/service/project/type'

export async function getProjectList() {
  return await http.get<Res<ProjectItem[]>>({
    url: '/project',
    showSuccessMsg: false,
    showErrorMsg: true
  })
}

export async function getProjectItem(projectId: number) {
  return await http.get<Res<ProjectItem>>({
    url: `/project/${projectId}`
  })
}
