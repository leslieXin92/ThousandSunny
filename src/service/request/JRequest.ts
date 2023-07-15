import axios, { AxiosInstance } from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import { IJRequestConfig, IJRequestInterceptors } from './type'

const DEFAULT_LOADING = false
const DEFAULT_SHOW_MESSAGE = false

class JRequest {
  instance: AxiosInstance
  interceptors?: IJRequestInterceptors
  showLoading: boolean
  isLoading: any // TODo - 类型
  showMsg: boolean

  constructor(config: IJRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.showMsg = config.showMsg ?? DEFAULT_SHOW_MESSAGE

    // 从config中取出拦截器 - 实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor as any, // TODO - 类型
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有实例的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.isLoading = ElLoading.service({
            lock: true,
            text: 'loading……',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (error) => {
        return error
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        if (this.showMsg && !res.data.code) {
          ElMessage({
            type: 'success',
            message: res.data.meg
          })
        }
        setTimeout(() => {
          this.isLoading?.close()
        }, 300)
        return res
      },
      (error: Error) => {
        return error
      }
    )
  }

  request<T = any>(config: IJRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 接口单独的拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showLoading === true || config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1、单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 2、每次调用完再将showLoading设置为初始值
          this.showLoading = DEFAULT_LOADING
          // 3、返回结果
          resolve(res)
        })
        .catch((error: Error) => {
          this.showLoading = DEFAULT_LOADING
          reject(error)
          return error
        })
    })
  }

  get<T = any>(config: IJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: IJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  put<T = any>(config: IJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  delete<T = any>(config: IJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

export default JRequest
