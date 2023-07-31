<template>
  <el-card>
    <template #header>
      <div class='boardHeader'>
        <div class='date'>{{ date }}</div>
        <div class='week'>{{ dayMap[dayjs(date).day()] }}</div>
      </div>
    </template>

    <div v-for='item in taskList' :key='item.taskId' class='taskGroup' v-loading='loading'>
      <div class='taskName'>{{ item.taskName }} :</div>
      <div v-for='(i, idx) in item.task' :key='i' class='taskItem'>{{ idx + 1 }}、{{ i }}</div>
    </div>
  </el-card>
</template>

<script setup lang='ts'>
import { ref, watch, onBeforeUnmount } from 'vue'
import emitter from '@/utils/mitt'
import dayjs from 'dayjs'
import { dayMap } from './config'
import { mockGetTask } from '@/views/Mirror/components/TaskBoard/mock'
import { ElMessage } from 'element-plus'

const taskList = ref()

const date = ref()

const loading = ref(false)

emitter.on('calendar2board', (data) => {
  date.value = data
})

watch(
  date,
  async (newValue) => {
    console.log(newValue)
    loading.value = true
    try {
      taskList.value = await mockGetTask(newValue)
    } catch (error) {
      ElMessage.error((error as Error).message)
    } finally {
      loading.value = false
    }
  },
  { immediate: true }
)

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
    background-color: #fff;

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
