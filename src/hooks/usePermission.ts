import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/useUserStore'
import type { UserPermissionType } from '@/service/user/type'

const usePermission = (permissionType: UserPermissionType) => {
  const userStore = useUserStore()
  const { isLogin, token, permission } = storeToRefs(userStore)

  if (!isLogin.value || !token.value) return false
  if (!permission.value) return false
  else if (permission.value === 'superAdmin') return true
  else if (permission.value === 'admin') return permissionType !== 'superAdmin'
  return permissionType === permission.value
}

export default usePermission
