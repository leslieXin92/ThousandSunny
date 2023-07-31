import JRequest from '@/service'
import { IData } from '@/service/api/type'
import {
  ILoginParams,
  ILoginRes,
  ILogoutParams,
  IRegisterParams,
  IRegisterRes
} from './type'

// 登陆
export function login(userInfo: ILoginParams) {
  return JRequest.post<IData<ILoginRes>>({
    url: '/login',
    data: userInfo,
    showLoading: true,
    showMsg: true
  })
}

// 注册
export function register(userInfo: IRegisterParams) {
  return JRequest.post<IData<IRegisterRes>>({
    url: '/register',
    data: userInfo,
    showLoading: true,
    showMsg: true
  })
}

// 登出
export function logout(userInfo: ILogoutParams) {
  return JRequest.post<IData<{}>>({
    url: '/logout',
    data: userInfo,
    showLoading: true,
    showMsg: true
  })
}
