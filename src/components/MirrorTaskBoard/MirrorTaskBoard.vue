<template>
  <div>{{ date }}</div>
</template>

<script setup lang='ts'>
import { onBeforeUnmount, ref, watch } from 'vue'
import emitter from '@/utils/mitt'

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
</style>
