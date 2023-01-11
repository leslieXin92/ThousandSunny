<template>
  <el-tooltip
    ref='tooltipRef'
    trigger='contextmenu'
    effect='light'
    :showArrow='false'
  >
    <slot></slot>
    <template #content>
      <el-button
        class='popoverBtn'
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
  >
    <JForm
      v-if='!isLogin'
      ref='JFormRef'
      :schema='schema'
      :rules='rules'
    />
    <div v-else>Are you sure logout ?</div>
  </JDialog>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/useUserStore'
import { storeToRefs } from 'pinia'
import JDialog from '@/components/JDialog/JDialog.vue'
import JForm from '@/components/JForm/JForm.vue'
import { FormRules, PopoverInstance } from 'element-plus'
import { IJFrom, ISchema } from '@/components/JForm/type'
import { ILoginParams } from '@/service/api/manage/type'
import { OperateType } from '@/components/JDialog/type'

const schema: ISchema[] = [
  {
    component: 'input',
    key: 'username',
    itemAttrs: {
      label: 'username'
    },
    attrs: {
      type: 'text'
    }
  },
  {
    component: 'input',
    key: 'password',
    itemAttrs: {
      label: 'password'
    },
    attrs: {
      type: 'password',
      showPassword: true
    }
  }
]

const rules: FormRules = {
  username: [
    { required: true, message: 'Please input Activity username', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input Activity password', trigger: 'blur' }
  ]
}

const tooltipRef = ref<PopoverInstance>()
const JFormRef = ref<IJFrom>()

const dialogVisible = ref(false)

const userStore = useUserStore()
const { isLogin } = storeToRefs(userStore)
const { handleLogin, handleLogout } = userStore

const curCase = computed(() => {
  return isLogin.value ? 'Logout' : 'Login'
})

const changeVisible = (newVisible: boolean) => {
  dialogVisible.value = newVisible
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
  isLogin.value
    ? handleLogout()
    : handleLogin(JFormRef.value!.getFormData() as ILoginParams)
  hideDialog()
}
</script>
