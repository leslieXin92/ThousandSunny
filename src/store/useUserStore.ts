import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ILoginParams, ILogoutParams } from '@/service/api/manage/type'
import { login, logout } from '@/service/api/manage/manage'

export const useUserStore = defineStore(
  'user',
  () => {
    type UserInfoType = { username: string } | null

    const userInfo = ref<UserInfoType>(null)

    const isLogin = ref(false)

    const handleLogin = async (loginParams: ILoginParams) => {
      const { data } = await login(loginParams)
      userInfo.value = data
      isLogin.value = true
    }

    const handleLogout = async () => {
      await logout(userInfo.value as ILogoutParams)
      userInfo.value = null
      isLogin.value = false
    }

    return {
      userInfo,
      isLogin,
      handleLogin,
      handleLogout
    }
  },
  {
    persist: {
      key: 'userStore',
      storage: sessionStorage
    }
  }
)
