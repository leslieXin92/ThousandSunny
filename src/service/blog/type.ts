export type BlogType = '' | 'public' | 'private'

export interface BlogItem {
  id: number
  type: BlogType
  title: string
  content: string
  createdAt: string
}

export interface GetBlogListParams {
  type?: BlogType
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
