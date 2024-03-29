export type ProjectStatus = 'pending' | 'doing' | 'done'

export interface ProjectItem {
  id: number
  name: string
  coverIcon: string
  description: string
  technologyStack: string[]
  status: ProjectStatus
  startAt: string
  doneAt: string
  createdAt: string
  updatedAt: string
}

export interface CreateProjectParams {
  name: string
  coverIcon: string
  description?: string
  technologyStack?: string[]
  status?: ProjectStatus
  codeAddress?: string
  onlineAddress?: string
  startAt?: string
  doneAt?: string
}

export interface UpdateProjectParams {
  id: number
  name: string
  coverIcon: string
  description?: string
  technologyStack?: string[]
  status?: ProjectStatus
  codeAddress?: string
  onlineAddress?: string
  startAt?: string
  doneAt?: string
}
