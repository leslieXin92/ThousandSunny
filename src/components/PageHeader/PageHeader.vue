<template>
  <ul class='PageHeader'>
    <li
      v-for='item in menuList'
      :key='item.label'
      :class='item.label'
      @click='skipMenu(item.label)'
    >
      {{ item.label }}
    </li>
  </ul>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'

const router = useRouter()

const menuList = [
  { label: 'home' },
  { label: 'blogList' },
  { label: 'admin' }
]

const skipMenu = (label: string) => {
  router.push({
    path: `/${label}`
  })
}
</script>

<style scoped lang='less'>
.PageHeader {
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  border: 1px solid red;

  li {
    margin: 0 20px;
    cursor: pointer;
  }
}
</style>
