export type UserPermissionType = 'normal' | 'admin' | 'superAdmin'

export interface LoginParams {
  username: string
  password: string
}

export interface LoginRes {
  id: string
  username: string
  token: string
  permission: UserPermissionType
}

export interface RegisterParams {
  username: string
  password: string
  confirmPassword: string
}
