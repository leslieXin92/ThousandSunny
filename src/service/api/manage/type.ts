export interface IData<T = any> {
  code: number
  data: T
  msg: string
}

export interface ILoginParams {
  username: string
  password: string
}

export interface ILoginRes {
  username: string
}

export interface ILogoutParams {
  username: string
}

export interface ILogoutRes {
}

export interface ICreateBlogParams {
  title: string
  content: string
  type: 'public' | 'private'
}

export interface ICreateBlogRes {
}

export interface IEditBlogParams {
  id: number
  type: 'public' | 'private'
  title: string
  content: string
}

export interface IEditBlogRes {
}

export interface IDeleteBlogRes {
}
