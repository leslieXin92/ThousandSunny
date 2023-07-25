export interface IData<T = {}> {
  code: number
  data: T
  msg: string
}

export interface IUploadImageRes {
  url: string
}
