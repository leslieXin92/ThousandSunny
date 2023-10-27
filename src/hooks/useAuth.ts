import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/useUserStore'

type VerifyType = 'user' | 'admin'

const writeList = ['Leslie', 'Cabbage', 'Lyle', 'Jonlyes'] as const

const useAuth = (type: VerifyType) => {
  const userStore = useUserStore()
  const { userInfo, isLogin, token } = storeToRefs(userStore)
  if (!isLogin.value || !token.value) return false
  if (type === 'user') return true
  return writeList.map(i => i.toLowerCase()).includes(userInfo.value!.username.toLowerCase())
}

export default useAuth
