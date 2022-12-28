<template>
  <ul class='PageHeader'>
    <el-popover
      ref='popoverRef'
      trigger='contextmenu'
      placement='bottom-start'
      :showArrow='false'
    >
      <el-button
        @click='openDialog'
        type='primary'
        size='small'
        text
        style='margin-left: 35px'
      >
        {{ curCase }}
      </el-button>
      <template #reference>
        <li class='logo'>Leslie</li>
      </template>
    </el-popover>

    <li
      v-for='item in showMenuList'
      :key='item.label'
      :class='item.label'
      @click='skipMenu(item.label)'
    >
      {{ item.label }}
    </li>
  </ul>

  <el-dialog
    v-model='dialogVisible'
    :title='curCase'
    width='500px'
    center
    destroyOnClose
    style='border-radius: 10px'
  >
    <JForm
      v-if='!isLogin'
      ref='JFormRef'
      :schema='schema'
      :rules='rules'
    />
    <div v-else>Are you sure logout ?</div>
    <template #footer>
      <el-button @click='hideDialog'>Cancel</el-button>
      <el-button type='primary' @click='handleConfirm'>{{ curCase }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/useUserStore'
import { storeToRefs } from 'pinia'
import JForm from '@/components/JForm/JForm.vue'
import { FormRules, PopoverInstance } from 'element-plus'
import { IJFrom, ISchema } from '@/components/JForm/type'
import { ILoginParams } from '@/service/api/manage/type'

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

const router = useRouter()
const userStore = useUserStore()

const popoverRef = ref<PopoverInstance>()
const JFormRef = ref<IJFrom>()

const { isLogin } = storeToRefs(userStore)
const { handleLogin, handleLogout } = userStore

const dialogVisible = ref(false)

const menuList = ref([
  { label: 'home', condition: true },
  { label: 'blogList', condition: true },
  { label: 'admin', condition: isLogin }
])

const curCase = computed(() => {
  return isLogin.value ? 'Logout' : 'Login'
})

const showMenuList = computed(() => {
  return menuList.value.filter(item => item.condition)
})

const openDialog = () => {
  popoverRef.value!.hide()
  dialogVisible.value = true
}

const hideDialog = () => {
  dialogVisible.value = false
}

const skipMenu = (label: string) => {
  router.push({
    path: `/${label}`
  })
}

const handleConfirm = async () => {
  if (JFormRef.value && !await JFormRef.value.validate()) return
  if (isLogin.value) {
    handleLogout()
  } else {
    const loginFormData = JFormRef.value!.getFormData() as ILoginParams
    handleLogin(loginFormData)
  }
  hideDialog()
}
</script>

<style scoped lang='less'>
.PageHeader {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #dedede;

  li {
    margin: 0 20px;
    cursor: pointer;
    font-size: 20px;
  }

  .logo {
    flex: 1;
    font-size: 34px;
    font-weight: bold;
  }
}
</style>
