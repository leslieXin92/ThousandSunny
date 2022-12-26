import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
import { ILoginParams } from '@/service/api/manage/type'
import { login, logout } from '@/service/api/manage/manage'
import { sessionCache } from '@/utils/cache'

export const useUserStore = defineStore('user', () => {
  type UserType = { username: string } | null

  const user: Ref<UserType> = ref(null)

  const isLogin = ref(false)

  const handleLogin = async (userInfo: ILoginParams) => {
    const { data } = await login(userInfo)
    sessionCache.setCache('username', data)
    isLogin.value = true
  }

  const handleLogout = async () => {
    const username = sessionCache.getCache('username')
    await logout({ username })
    sessionCache.deleteCache('username')
    isLogin.value = false
  }

  return {
    user,
    isLogin,
    handleLogin,
    handleLogout
  }
})
