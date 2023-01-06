<template>
  <el-card shadow='hover'>
    <template #header>
      <div class='boardHeader'>
        <div class='date'>{{ date }}</div>
        <div class='week'>{{ weekMap[dayjs(date).day()] }}</div>
      </div>
    </template>

    <section class='section'>
      <div>个人网站：</div>
      <div>1、home页面注入three</div>
      <div>2、mirror页面开发</div>
    </section>
    <section class='section'>
      <div>node：</div>
      <div>1、http模块</div>
      <div>2、url模块</div>
    </section>
  </el-card>
</template>

<script setup lang='ts'>
import { onBeforeUnmount, ref, watch } from 'vue'
import emitter from '@/utils/mitt'
import dayjs from 'dayjs'

const weekMap = {
  0: '星期日',
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六'
}

const date = ref()

emitter.on('calendar2board', (data) => {
  date.value = data
})

watch(date, (newValue) => {
  console.log(newValue)
  // 请求当日task
})

onBeforeUnmount(() => {
  emitter.off('calendar2board')
})
</script>

<style scoped lang='less'>
.el-card {
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }
}

:deep(.el-card__header) {
  position: sticky;
  top: 0;
  background: #fff;
}

.boardHeader {
  display: flex;
  justify-content: space-between;
}

.section {
  margin-left: 10px;

  div {
    margin: 10px 20px;

    &:first-child {
      font-size: 18px;
      margin: 0;
    }

    &:last-child {
      margin-bottom: 30px;
    }
  }
}
</style>
