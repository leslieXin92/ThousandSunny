<template>
  <h1>BlogList</h1>
  <ul>
    <li v-for='item in blogList' :key='item.id'>
      <div style='margin: 100px'>{{ item.title }}</div>
    </li>
  </ul>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useLoadBlogList } from '@/hooks/useLoadBlogList'
import { BlogItem } from '@/service/api/portal/type'
import { useUserStore } from '@/store/useUserStore'
import { storeToRefs } from 'pinia'

const blogList = ref<Omit<BlogItem, 'content'>[]>([])

const userStore = useUserStore()
const { isLogin } = storeToRefs(userStore)

const params = ref({
  type: isLogin ? 'private' : 'public' as 'public' | 'private',
  pageNum: 1,
  pageSize: 10
})

const props = {
  params,
  originData: blogList
}

useLoadBlogList(props)
</script>

<style scoped lang='less'>
</style>
