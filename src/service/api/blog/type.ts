export interface IData<T = {}> {
  code: number
  data: T
  msg: string
}

export interface IBlogItem {
  id: number
  title: string
  createAt: number
  content: string
  showYear?: boolean
  newYear?: number
}

export interface ICreateBlogParams {
  title: string
  content: string
  type: 'public' | 'private'
}

export interface IEditBlogParams {
  id: number
  type: 'public' | 'private'
  title: string
  content: string
}

export interface IGetBlogListParams {
  type: 'public' | 'private'
  pageNum: number
  pageSize: number
}

export interface IGetBlogListParams {
  type: 'public' | 'private'
  pageNum: number
  pageSize: number
}

export interface IGetBlogListRes {
  blogList: Omit<IBlogItem, 'content'>[]
  total: number
}
