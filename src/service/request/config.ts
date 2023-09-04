// 区分环境变量:
let baseURL = ''

switch (process.env.NODE_ENV) {
  case 'development':
    baseURL = '/api'
    break
  case 'production':
    baseURL = ''
    break
}

export { baseURL }
