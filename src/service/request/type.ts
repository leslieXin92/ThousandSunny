import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface IJRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface IJRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: IJRequestInterceptors<T>
  showLoading?: boolean
}
