import JRequest from './request/JRequest'
import { baseURL } from './request/config'

export default new JRequest({
  baseURL,
  interceptors: {
    requestInterceptor: (config) => {
      return config
    },
    requestInterceptorCatch: (error) => {
      return error
    },
    responseInterceptor: (res) => {
      return res.data
    },
    responseInterceptorCatch: (error) => {
      return error
    }
  }
})
