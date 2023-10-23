import { ElMessage } from 'element-plus'

class Message {
  success(message: string) {
    return ElMessage({
      message,
      type: 'success'
    })
  }

  error(message: string) {
    return ElMessage({
      message,
      type: 'error'
    })
  }

  warning(message: string) {
    return ElMessage({
      message,
      type: 'warning'
    })
  }
}

export default new Message()
