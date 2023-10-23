export interface LoginParams {
  username: string
  password: string
}

export interface LoginRes {
  id: number
  username: string
  token: string
}

export interface RegisterParams {
  username: string
  password: string
  confirmPassword: string
}
