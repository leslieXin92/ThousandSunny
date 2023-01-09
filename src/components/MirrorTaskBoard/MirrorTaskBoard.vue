<template>
  <el-card>
    <template #header>
      <div class='boardHeader'>
        <div class='date'>{{ date }}</div>
        <div class='week'>{{ weekMap[dayjs(date).day()] }}</div>
      </div>
    </template>

    <div v-for='item in taskList' :key='item.taskId' class='taskGroup'>
      <div class='taskName'>{{ item.taskName }} :</div>
      <div v-for='(i, idx) in item.task' :key='i' class='taskItem'>{{ idx + 1 }}、{{ i }}</div>
    </div>
  </el-card>
</template>

<script setup lang='ts'>
import { onBeforeUnmount, ref, watch } from 'vue'
import emitter from '@/utils/mitt'
import dayjs from 'dayjs'

const taskList = [
  { taskId: 0, taskName: '个人网站', task: ['home页面注入three', 'mirror页面开发'] },
  { taskId: 1, taskName: 'node', task: ['http模块', 'url模块'] },
  { taskId: 0, taskName: '个人网站', task: ['home页面注入three', 'mirror页面开发'] },
  { taskId: 1, taskName: 'node', task: ['http模块', 'url模块'] },
  { taskId: 0, taskName: '个人网站', task: ['home页面注入three', 'mirror页面开发'] },
  { taskId: 1, taskName: 'node', task: ['http模块', 'url模块'] }
]

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

  :deep(.el-card__header) {
    position: sticky;
    top: 0;
    background: #fff;

    .boardHeader {
      display: flex;
      justify-content: space-between;
    }
  }

  .taskGroup {
    margin: 30px 20px;

    &:first-child {
      margin-top: 10px;
    }

    .taskName {
      font-size: 18px;
    }

    .taskItem {
      margin: 10px 20px;
    }
  }
}
</style>
