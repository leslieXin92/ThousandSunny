export type VisibilityType = '' | 'public' | 'private'

export interface BlogItem {
  id: number
  visibility: VisibilityType
  title: string
  content: string
  createdAt: string
}

export interface GetBlogListParams {
  visibility?: VisibilityType
  page: number
}

export interface GetBlogListRes {
  blogList: Omit<BlogItem, 'content'>[]
  totalCount: number
}

export interface CreateBlogParams {
  title: string
  content: string
  type: 'public' | 'private'
}

export interface UpdateBlogParams {
  id: number
  title: string
  content: string
  type: 'public' | 'private'
}
