<template>
  <div class='mirror'>

    <el-calendar ref='calendarRef' class='calendar'>
      <template #header='{ date }'>
        <div>{{ date }}</div>
        <div>
          <el-button size='small' @click="selectDate('prev-month')">{{ '<' }}</el-button>
          <el-button size='small' @click="selectDate('today')">|</el-button>
          <el-button size='small' @click="selectDate('next-month')">{{ '>' }}</el-button>
        </div>
      </template>

      <template #date-cell='{ data }'>
        <div class='dateCell'>
          <div
            class='date'
            :class="{
              today: dayjs(new Date()).format('YYYY-MM-DD') === data.day
            }"
          >
            {{ data.day.split('-')[2] }}
          </div>
        </div>
      </template>
    </el-calendar>

    <div class='board'></div>
  </div>

</template>

<script setup lang='ts'>
import { ref } from 'vue'
import dayjs from 'dayjs'

const calendarRef = ref()

const selectDate = (val: string) => {
  calendarRef.value.selectDate(val)
}
</script>

<style scoped lang='less'>
.mirror {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-width: 960px;
  margin: 50px auto;

  .calendar {
    width: 800px;
    border: 1px dashed #dedede;

    .dateCell {
      position: relative;

      .date {
        position: absolute;
        top: 7px;
        left: 7px;
        font-size: 60px;
        font-weight: bold;
        color: #efefef;
      }

      .today {
        color: red;
      }
    }

    :deep(.el-calendar-day) {
      height: 100px;
    }
  }

  .board {
    width: 400px;
    height: 200px;
    margin-left: 50px;
    background: #ccc;
  }
}
</style>
