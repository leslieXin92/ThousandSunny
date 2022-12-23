import { defineStore } from 'pinia'
import { computed, Ref, ref } from 'vue'
import { ILoginParams } from '@/service/api/manage/type'
import { login, logout } from '@/service/api/manage/manage'
import { sessionCache } from '@/utils/cache'

export const useUserStore = defineStore('user', () => {
  type UserType = { username: string } | null

  const user: Ref<UserType> = ref(null)

  const isLogin = computed(() => {
    return user.value
  })

  const handleLogin = async (userInfo: ILoginParams) => {
    const res = await login(userInfo)
    console.log(res)
    sessionCache.setCache('username', res)
  }

  const handleLogout = async () => {
    const username = sessionCache.getCache('username')
    await logout({ username })
  }

  return {
    user,
    handleLogin
  }
})
