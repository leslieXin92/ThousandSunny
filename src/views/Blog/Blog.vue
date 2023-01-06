<template>
  <div class='blogList'>
    <template v-for='item in blogList' :key='item.id'>
      <div class='year' v-if="item.showYear">{{ item.newYear }}</div>
      <div class='blogItem'>
        <div class='blogTitle' @click='skipBlogDetail(item.id)'>{{ item.title }}</div>
        <div class='dot'></div>
        <div class='time'>{{ dayjs(item.createAt).format('YYYY-MM-DD') }}</div>
      </div>
    </template>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useUserStore } from '@/store/useUserStore'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
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

useLoadBlogList(props)

const skipBlogDetail = (id: number) => {
  window.getSelection()!.removeAllRanges()
  console.log(id)
}
</script>

<style scoped lang='less'>
.blogList {
  width: 60%;
  margin: 0 auto;

  .year {
    margin: 10px 20px;
    font-size: 80px;
    font-weight: bold;
    cursor: default;
    color: #dedede;
  }

  .blogItem {
    padding: 30px 0;
    font-size: 18px;
    border-left: 6px solid rgba(0, 139, 139, 0.1);

    &:first-child {
      padding-top: 0;
    }

    .blogTitle {
      margin-left: 40px;
      font-size: 20px;
      cursor: pointer;

      &:hover {
        color: darkcyan;
      }

      &:active {
        color: darkgreen;
      }
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      transform: translateX(-9.5px);
      background: darkcyan;
    }

    .time {
      margin-left: 40px;
      color: #999;
    }
  }
}
</style>
