import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface Res<D = {}> {
  code: 0 | 1
  data: D
  msg: string
}

export interface HttpInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: Error) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: Error) => any
}

export interface HttpConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HttpInterceptors<T>
  loading?: boolean
  showSuccessMsg?: boolean
  showErrorMsg?: boolean
}

export type EnvType = 'development' | 'production'
