import Http from './axios'
import { baseURLMap } from '@/service/axios/config'
import type { EnvType } from '@/service/axios/type'

export default new Http({
  baseURL: baseURLMap[import.meta.env.MODE as EnvType],
  timeout: 10000
})
