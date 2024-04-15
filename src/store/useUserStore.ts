import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { autoLogin, login, register } from '@/service/user'
import { localCache } from '@/utils/cache'
import type { LoginParams, LoginRes, RegisterParams, UserPermissionType } from '@/service/user/type'

export const useUserStore = defineStore(
  'user',
  () => {
    const router = useRouter()

    const userInfo = ref<Omit<LoginRes, 'token'>>()

    const isLogin = ref(false)
    const token = ref<string>()
    const permission = ref<UserPermissionType>()

    const changeIsLogin = (loginState: boolean) => {
      isLogin.value = loginState
    }

    const handleRegister = async (registerParams: RegisterParams) => {
      await register(registerParams)
      await handleLogin(registerParams)
    }

    const handleLogin = async (loginParams: LoginParams) => {
      const { data } = await login(loginParams)
      userInfo.value = data
      changeIsLogin(true)
      token.value = data.token
      permission.value = data.permission
    }

    const handleLogout = async () => {
      userInfo.value = undefined
      changeIsLogin(false)
      permission.value = undefined
      await router.push('/home')
    }

    const handleAutoLogin = async () => {
      if (isLogin.value) return
      const userCache = localCache.get('userStore')
      if (!userCache?.userInfo) return
      const { data } = await autoLogin({
        id: userCache.userInfo.id,
        username: userCache.userInfo.username,
        permission: userCache.userInfo.permission
      })
      changeIsLogin(true)
      token.value = data.token
    }

    return {
      userInfo,
      isLogin,
      token,
      permission,
      changeIsLogin,
      handleRegister,
      handleLogin,
      handleLogout,
      handleAutoLogin
    }
  },
  {
    persist: {
      key: 'userStore',
      storage: localStorage
    }
  }
)
