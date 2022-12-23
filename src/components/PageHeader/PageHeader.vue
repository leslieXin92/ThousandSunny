<template>
  <ul class='PageHeader'>
    <el-popover
      trigger='contextmenu'
      placement='bottom-start'
      :showArrow='false'
      ref='popover'
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

  <el-dialog v-model='dialogVisible' :title='curCase' width='40%' center>
    <span>1111</span>
    <template #footer>
      <div>
        <el-button @click='dialogVisible = false'>Cancel</el-button>
        <el-button type='primary' @click='handleConfirm'>{{ curCase }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import { computed, Ref, ref, shallowRef } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const popover: Ref = ref(null)

const isLogin = shallowRef(false)
const dialogVisible = ref(false)

const curCase = computed(() => {
  return isLogin.value ? 'logout' : 'login'
})

const openDialog = () => {
  popover.value.hide()
  dialogVisible.value = true
}

const menuList = ref([
  { label: 'home', condition: true },
  { label: 'blogList', condition: true },
  { label: 'admin', condition: isLogin }
])

const showMenuList = computed(() => {
  return menuList.value.filter(item => item.condition)
})

const skipMenu = (label: string) => {
  router.push({
    path: `/${label}`
  })
}

const handleConfirm = () => {
  dialogVisible.value = false
  setTimeout(() => {
    isLogin.value = !isLogin.value
  }, 200)
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
