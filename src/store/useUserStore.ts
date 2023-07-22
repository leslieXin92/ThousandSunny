import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ILoginParams, ILogoutParams, IRegisterParams } from '@/service/api/user/type'
import { login, logout, register } from '@/service/api/user'

export const useUserStore = defineStore(
  'user',
  () => {
    type UserInfoType = { username: string } | null

    const userInfo = ref<UserInfoType>(null)

    const isLogin = ref(false)

    const handleRegister = async (registerParams: IRegisterParams) => {
      const { data } = await register(registerParams)
      userInfo.value = data
      isLogin.value = true
    }

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
      handleRegister,
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
