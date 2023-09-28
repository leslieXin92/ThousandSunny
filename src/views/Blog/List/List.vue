<template>
  <div class='blogList'>
    <template v-for='item in blogList' :key='item.id'>
      <div class='year' v-if='item.showYear'>{{ dayjs(item.createAt).year() }}</div>
      <div class='blogItem'>
        <div class='blogTitle' @click='skipBlogItem(item.id)'>{{ item.title }}</div>
        <div class='dot'></div>
        <div class='time'>{{ dayjs(item.createAt).format('YYYY-MM-DD') }}</div>
      </div>
    </template>
  </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'
import useBlogList from '@/hooks/useBlogList'
import dayjs from 'dayjs'

const router = useRouter()

// const { blogList } = useBlogList()
const blogList = [{
  id: 1,
  showYear: true,
  createAt: '2023-09-28',
  title: 'Hello World'
}]

const skipBlogItem = (id: number) => {
  window.getSelection()!.removeAllRanges()
  router.push(`/blog/${id}`)
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
      background-color: darkcyan;
    }

    .time {
      margin-left: 40px;
      color: #999;
    }
  }
}
</style>
