<template>
  <div class='mirror'>
    <MirrorCalendar class='calendar' />
    <MirrorTaskBoard class='board' />
  </div>

</template>

<script setup lang='ts'>
import MirrorCalendar from '@/components/MirrorCalendar/MirrorCalendar.vue'
import MirrorTaskBoard from '@/components/MirrorTaskBoard/MirrorTaskBoard.vue'
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
