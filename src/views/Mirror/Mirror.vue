<template>
  <div class='mirror'>
    <Calendar class='calendar' />
    <TaskBoard class='board' />
  </div>
</template>

<script setup lang='ts'>
import Calendar from '@/views/Mirror/components/Calendar/Calendar.vue'
import TaskBoard from '@/views/Mirror/components/TaskBoard/TaskBoard.vue'
</script>

<style scoped lang='less'>
.mirror {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 700px;
  font-style: oblique;

  .calendar {
    width: 800px;
  }

  .board {
    width: 400px;
    height: 450px;
    margin-left: 50px;
    border-radius: 20px;
    overflow: scroll;
  }
}
</style>
