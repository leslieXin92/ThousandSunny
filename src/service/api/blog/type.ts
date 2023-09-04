export type BlogType = 'public' | 'private'

export interface IBlogItem {
  id: number
  type: BlogType
  title: string
  createAt: string
  content: string
  showYear?: boolean
}

export interface ICreateBlogParams {
  title: string
  content: string
  type: BlogType
}

export interface IEditBlogParams {
  id: number
  type: BlogType
  title: string
  content: string
}

export interface IGetBlogListParams {
  type: BlogType
  page: number
}

export interface IGetBlogListRes {
  blogList: Omit<IBlogItem, 'content'>[]
  totalCount: number
}
