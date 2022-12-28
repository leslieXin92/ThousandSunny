import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface IJRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: Error) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: Error) => any
}

export interface IJRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: IJRequestInterceptors<T>
  showLoading?: boolean
  showMsg?: boolean
}
