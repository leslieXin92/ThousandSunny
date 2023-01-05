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
  createAt: string
  content: string
}

export interface IGetBlogListRes {
  blogList: Omit<IBlogItem, 'content'>[]
  total: number
}
