<template>
  <ul class='PageHeader'>
    <li
      v-for='item in showMenuList'
      :key='item.label'
      :class='item.label'
      @click='skipMenu(item.routePath)'
    >
      {{ item.label }}
    </li>
  </ul>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/useUserStore'
import { storeToRefs } from 'pinia'

const router = useRouter()
const userStore = useUserStore()
const { isLogin } = storeToRefs(userStore)

const menuList = ref([
  { label: 'Leslie', routePath: '/home', condition: true },
  { label: 'home', routePath: '/home', condition: true },
  { label: 'blogList', routePath: '/blogList', condition: true },
  { label: 'admin', routePath: '/admin', condition: isLogin }
])

const showMenuList = computed(() => {
  return menuList.value.filter(item => item.condition)
})

const skipMenu = (routePath: string) => {
  router.push({
    path: routePath
  })
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

    &:first-child {
      flex: 1;
      font-size: 34px;
      font-weight: bold;
    }
  }
}
</style>
