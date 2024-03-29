import http from '@/service/axios/http'
import type { Res } from '@/service/axios/type'
import type { ProjectItem, CreateProjectParams, UpdateProjectParams } from './type'

export async function getProjectList() {
  return await http.get<Res<ProjectItem[]>>({
    url: '/project',
    showSuccessMsg: false,
    showErrorMsg: true
  })
}

export async function getProjectItem(projectId: number) {
  return await http.get<Res<ProjectItem>>({
    url: `/project/${projectId}`,
    showSuccessMsg: false,
    showErrorMsg: true
  })
}

export async function createProject(data: CreateProjectParams) {
  return http.post<Res>({
    url: '/project',
    data,
    showSuccessMsg: true,
    showErrorMsg: true
  })
}

export async function updateProject(data: UpdateProjectParams) {
  return http.patch<Res>({
    url: `/project/${data.id}`,
    data,
    showSuccessMsg: true,
    showErrorMsg: true
  })
}

export async function deleteProject(projectId: number) {
  return http.delete<Res>({
    url: `/project/${projectId}`,
    showSuccessMsg: true,
    showErrorMsg: true
  })
}
