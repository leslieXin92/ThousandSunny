import Http from './axios'

export default new Http({
  baseURL: '/api',
  timeout: 10000
})
