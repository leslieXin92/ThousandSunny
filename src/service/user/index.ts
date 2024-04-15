import http from '@/service/axios/http'
import type { Res } from '@/service/axios/type'
import type { LoginParams, LoginRes, RegisterParams } from './type'

export function register(data: RegisterParams): Promise<Res> {
  return http.post({
    url: '/user/register',
    data,
    showSuccessMsg: true,
    showErrorMsg: true
  })
}

export function login(data: LoginParams) {
  return http.post<Res<LoginRes>>({
    url: '/user/login',
    data,
    showSuccessMsg: true,
    showErrorMsg: true
  })
}

export function autoLogin(data: any) {
  return http.post<Res<LoginRes>>({
    url: '/user/autoLogin',
    data,
    showSuccessMsg: false,
    showErrorMsg: false
  })
}
