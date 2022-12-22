<template>
  <h1>BlogList</h1>
  <ul>
    <li v-for='item in blogList' :key='item.id'>
      <div style='margin: 100px'>{{ item.title }}</div>
    </li>
  </ul>
</template>

<script setup lang='ts'>
import { ref, Ref } from 'vue'
import { useLoadBlogList } from '@/hooks/useLoadBlogList'
import { BlogItem } from '@/service/api/portal/type'

const blogList: Ref<Omit<BlogItem, 'content'>[]> = ref([])

const params = {
  type: 'public' as 'public' | 'private',
  pageNum: 1,
  pageSize: 10
}

const props = {
  params,
  originData: blogList
}

useLoadBlogList(props)
</script>

<style scoped lang='less'>
</style>
