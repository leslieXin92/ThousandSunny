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
