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
    url: '/user/login',
    data: userInfo,
    showLoading: true,
    showMsg: true
  })
}

// 注册
export function register(userInfo: IRegisterParams) {
  return JRequest.post<IData<IRegisterRes>>({
    url: '/user/register',
    data: userInfo,
    showLoading: true,
    showMsg: true
  })
}
