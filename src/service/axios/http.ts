import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/useUserStore'
import Http from './axios'
import { baseURLMap } from './config'
import type { EnvType } from '@/service/axios/type'

export default new Http({
  baseURL: baseURLMap[import.meta.env.MODE as EnvType],
  timeout: 10000,
  interceptors: {
    requestInterceptor(config) {
      const userStore = useUserStore()
      const { isLogin, token } = storeToRefs(userStore)
      if (isLogin.value && token.value) config.headers!.authorization = 'Bearer ' + token.value
      return config
    }
  }
})
