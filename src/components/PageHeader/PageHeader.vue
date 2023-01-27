<template>
  <ul class='PageHeader'>
    <li
      v-for='item in showMenuList'
      :key='item.label'
      :class='{active: curMenu === item.label}'
      @click='skipMenu(item.routePath)'
    >
      {{ item.label }}
    </li>
  </ul>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/useUserStore'
import { storeToRefs } from 'pinia'
import { IMenuItem } from './type'

const route = useRoute()
const router = useRouter()

const userStore = useUserStore()
const { isLogin } = storeToRefs(userStore)

const menuList = ref<IMenuItem[]>([
  { label: 'Leslie', routePath: '/home', condition: true },
  { label: 'Blog', routePath: '/blog', condition: true },
  { label: 'Project', routePath: '/project', condition: true },
  { label: 'Mirror', routePath: '/mirror', condition: true },
  { label: 'Admin', routePath: '/admin', condition: isLogin }
])

const showMenuList = computed(() => {
  return menuList.value.filter(item => item.condition)
})

const curMenu = computed(() => {
  return showMenuList.value.find(item => item.routePath === `/${route.path.split('/')[1]}`)?.label
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
  height: 100px;
  border-bottom: 1px solid #dedede;

  li {
    margin: 0 20px;
    cursor: pointer;
    font-size: 20px;
    font-style: oblique;

    &:first-child {
      flex: 1;
      font-size: 34px;
      font-weight: bold;
    }

    &:hover {
      color: rgba(0, 139, 139, 0.6);
    }
  }

  .active {
    color: #008b8b;
  }
}
</style>
