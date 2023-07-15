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

export interface IRegisterParams {
  username: string
  password: string
  confirmPassword: string
}

export interface IRegisterRes {
    username: string
}