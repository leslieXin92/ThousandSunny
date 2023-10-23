import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { login, register } from '@/service/user'
import type { LoginParams, LoginRes, RegisterParams } from '@/service/user/type'

export const useUserStore = defineStore(
  'user',
  () => {
    const router = useRouter()

    const userInfo = ref<Omit<LoginRes, 'token'> | null>(null)

    const isLogin = ref(false)
    const token = ref<string>()

    const handleRegister = async (registerParams: RegisterParams) => {
      await register(registerParams)
      await handleLogin(registerParams)
    }

    const handleLogin = async (loginParams: LoginParams) => {
      const { data } = await login(loginParams)
      userInfo.value = data
      isLogin.value = true
      token.value = data.token
    }

    const handleLogout = async () => {
      userInfo.value = null
      isLogin.value = false
      await router.push('/home')
    }

    return {
      userInfo,
      isLogin,
      token,
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
