export interface IData<T = any> {
  code: number
  data: T
  msg: string
}

export interface IGetBlogListParams {
  type: 'public' | 'private'
  pageNum: number
  pageSize: number
}

export interface IBlogItem {
  id: number
  title: string
  createAt: number
  content: string
  showYear?: boolean
  newYear?: number
}

export interface IGetBlogListRes {
  blogList: Omit<IBlogItem, 'content'>[]
  total: number
}
