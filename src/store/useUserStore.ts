import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ILoginParams, IRegisterParams } from '@/service/api/user/type'
import { login, register } from '@/service/api/user'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore(
  'user',
  () => {
    type UserInfoType = { username: string } | null

    const router = useRouter()

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
      userInfo.value = null
      isLogin.value = false
      await router.push('/home')
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
