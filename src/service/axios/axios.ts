import axios from 'axios'
import message from '@/utils/message'
import type { AxiosResponse, AxiosError, AxiosInstance } from 'axios'
import type { Res, HttpConfig } from './type'
import { sessionCache } from '@/utils/cache'

class Http {
  instance: AxiosInstance
  showSuccessMsg: boolean // 请求成功后是否自动toast success msg
  showErrorMsg: boolean // 请求失败后是否自动toast error msg

  constructor(config: HttpConfig) {
    this.instance = axios.create(config)
    this.showSuccessMsg = config.showSuccessMsg ?? false
    this.showErrorMsg = config.showErrorMsg ?? false

    this.instance.interceptors.request.use(
      (config) => {
        const userStore = sessionCache.get('userStore')
        if (userStore?.token) config.headers.authorization = 'Bearer ' + userStore.token
        return config
      },
      (error: AxiosError) => {
        return error
      }
    )

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (this.showSuccessMsg) message.success(response.data.msg)
        return Promise.resolve(response.data)
      },
      (error: AxiosError<Res>) => {
        if (error!.response?.data.code) {
          if (this.showErrorMsg) message.error(error.response.data.msg)
          return Promise.reject(error.response?.data.msg)
        }
        message.error('Network Error!')
        return Promise.reject('Network Error!')
      }
    )
  }

  request<T = unknown>(config: HttpConfig<T>) {
    return new Promise<T>((resolve, reject) => {
      // 单个接口
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showSuccessMsg === true || config.showSuccessMsg === false) {
        this.showSuccessMsg = config.showSuccessMsg
      }
      if (config.showErrorMsg === true || config.showErrorMsg === false) {
        this.showErrorMsg = config.showErrorMsg
      }
      this.instance
        .request<unknown, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })
  }

  get<T = unknown>(config: HttpConfig<T>) {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = unknown>(config: HttpConfig<T>) {
    return this.request<T>({ ...config, method: 'POST' })
  }

  put<T = unknown>(config: HttpConfig<T>) {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  patch<T = unknown>(config: HttpConfig<T>) {
    return this.request<T>({ ...config, method: 'PATCH' })
  }

  delete<T = unknown>(config: HttpConfig<T>) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

export default Http
