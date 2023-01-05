<template>
  <h1>BlogList</h1>
  <div class='blogList'>
    <div v-for='item in list' :key='item.id' class='blogItem'>
      <div class='blogTitle'>{{ item.title }}</div>
      <div class='dot'></div>
      <div class='time'>{{ item.createAt }}</div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useUserStore } from '@/store/useUserStore'
import { storeToRefs } from 'pinia'
import { useLoadBlogList } from '@/hooks/useLoadBlogList'
import { IBlogItem } from '@/service/api/portal/type'

const blogList = ref<Omit<IBlogItem, 'content'>[]>([])

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

const list = [
  { id: 0, title: '浅谈node之koa', createAt: '2021-01-05' },
  { id: 1, title: '浅谈node之koa', createAt: '2021-01-05' },
  { id: 2, title: '浅谈node之koa', createAt: '2021-01-05' },
  { id: 3, title: '浅谈node之koa', createAt: '2021-01-05' },
  { id: 4, title: '浅谈node之koa', createAt: '2021-01-05' },
  { id: 5, title: '浅谈node之koa', createAt: '2021-01-05' },
  { id: 6, title: '浅谈node之koa', createAt: '2022-01-05' },
  { id: 7, title: '浅谈node之koa', createAt: '2022-01-05' },
  { id: 8, title: '浅谈node之koa', createAt: '2022-01-05' },
  { id: 9, title: '浅谈node之koa', createAt: '2022-01-05' },
  { id: 10, title: '浅谈node之koa', createAt: '2022-01-05' },
  { id: 11, title: '浅谈node之koa', createAt: '2022-01-05' },
  { id: 12, title: '浅谈node之koa', createAt: '2022-01-05' },
  { id: 13, title: '浅谈node之koa', createAt: '2022-01-05' },
  { id: 14, title: '浅谈node之koa', createAt: '2022-01-05' },
  { id: 15, title: '浅谈node之koa', createAt: '2022-01-05' },
  { id: 16, title: '浅谈node之koa', createAt: '2023-01-05' },
  { id: 17, title: '浅谈node之koa', createAt: '2023-01-05' },
  { id: 18, title: '浅谈node之koa', createAt: '2023-01-05' },
  { id: 19, title: '浅谈node之koa', createAt: '2023-01-05' }
]
// useLoadBlogList(props)
</script>

<style scoped lang='less'>
.blogList {
  width: 800px;
  margin: 0 auto;

  .blogItem {
    padding: 30px 0;
    font-size: 18px;
    border-left: 6px solid rgba(0, 139, 139, 0.1);

    .blogTitle {
      margin-left: 40px;
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      transform: translateX(-8px);
      background: darkcyan;
    }

    .time {
      margin-left: 40px;
    }
  }
}
</style>
