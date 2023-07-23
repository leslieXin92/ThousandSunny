<template>
  <el-tooltip
    ref='tooltipRef'
    trigger='contextmenu'
    effect='light'
    :showArrow='false'
  >
    <slot />
    <template #content>
      <el-button
        size='small'
        style='color: darkcyan'
        link
        @click='openDialog'
      >
        {{ curCase }}
      </el-button>
    </template>
  </el-tooltip>

  <JDialog
    :title='curCase'
    :visible='dialogVisible'
    @changeVisible='changeVisible'
    @operate='operate'
    @titleClickCallback='titleClickCallback'
  >
    <JForm
      v-if='!isLogin'
      :key='curCase'
      ref='JFormRef'
      :schema='schema'
      :rules='rules'
    />
    <div v-else>Are you sure logout ?</div>
  </JDialog>
</template>

<script setup lang='ts'>
import { ref, computed, watch, Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/useUserStore'
import JDialog from '@/components/JDialog/JDialog.vue'
import JForm from '@/components/JForm/JForm.vue'
import { registerSchema, loginSchema, registerRules, loginRules } from './config'
import { PopoverInstance } from 'element-plus'
import { IJFrom } from '@/components/JForm/type'
import { ILoginParams, IRegisterParams } from '@/service/api/user/type'
import { OperateType } from '@/components/JDialog/type'

type CaseType = 'Register' | 'Login' | 'Logout'

const tooltipRef = ref<PopoverInstance>()
const JFormRef = ref<IJFrom>()

const curCase = ref<CaseType>('Login')
const dialogVisible = ref(false)

const userStore = useUserStore()
const { isLogin } = storeToRefs(userStore)
const { handleRegister, handleLogin, handleLogout } = userStore

const operateMap = {
  Register: () => handleRegister(JFormRef.value!.getFormData() as IRegisterParams),
  Login: () => handleLogin(JFormRef.value!.getFormData() as ILoginParams),
  Logout: () => handleLogout().then(() => curCase.value = 'Login')
}

watch(
  () => isLogin,
  (newState: Ref<boolean>) => curCase.value = newState.value ? 'Logout' : 'Login',
  { immediate: true, deep: true }
)

const schema = computed(() => {
  return curCase.value === 'Login' ? loginSchema : registerSchema
})

const rules = computed(() => {
  return curCase.value === 'Login' ? loginRules : registerRules
})

const titleClickCallback = () => {
  if (curCase.value === 'Logout') return
  curCase.value = curCase.value === 'Login' ? 'Register' : 'Login'
}

const changeVisible = (newVisible: boolean) => {
  dialogVisible.value = newVisible
  if (!newVisible && curCase.value === 'Register') {
    curCase.value = 'Login'
    JFormRef.value!.reset()
  }
}

const openDialog = () => {
  tooltipRef.value!.hide()
  dialogVisible.value = true
}

const hideDialog = () => {
  dialogVisible.value = false
}

const operate = async (type: OperateType) => {
  if (type === 'cancel') return hideDialog()
  if (JFormRef.value && !await JFormRef.value.validate()) return
  await operateMap[curCase.value!]()
  hideDialog()
}
</script>
