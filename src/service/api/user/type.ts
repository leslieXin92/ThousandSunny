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
  confirm: string
}

export interface IRegisterRes {
  username: string
}
