// 区分环境变量:
let baseURL = ''

switch (process.env.NODE_ENV) {
  case 'development':
    // baseURL = '/api'
    baseURL = 'https://mock.apifox.cn/m1/2076068-0-default'
    break
  case 'production':
    baseURL = ''
    break
}

export { baseURL }
