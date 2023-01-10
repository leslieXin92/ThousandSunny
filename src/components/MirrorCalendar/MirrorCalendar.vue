<template>
  <el-calendar ref='calendarRef' v-model='curSelectDay'>
    <template #header='{ date }'>
      <div class='headerDate'>{{ date }}</div>
      <div>
        <el-button
          v-for='item in calendarBtnList'
          :key='item.key'
          link
          @click='changeMonth(item.key)'
        >
          <img
            :src='`/src/assets/${item.icon}`'
            :alt='`${item.icon}`'
            style='width: 30px'
          />
        </el-button>
      </div>
    </template>

    <template #date-cell='{ data }'>
      <div
        class='dateCell'
        :class='{
          laterMonth: judgeIsLaterMonth(data),
          learn: judgeIsLearn(data),
          rest: judgeIsRest(data)
        }'
      >
        {{ data.day.split('-')[2] }}
      </div>
    </template>
  </el-calendar>
</template>

<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue'
import dayjs from 'dayjs'
import { IDateCell } from './type'
import emitter from '@/utils/mitt'
import { ElCalendar } from 'element-plus'

const calendarRef = ref<typeof ElCalendar>()

const curSelectDay = ref<Date>()

onMounted(() => {
  curSelectDay.value = new Date()
})

const calendarBtnList = [
  { key: 'prev-month', icon: 'left.png' },
  { key: 'today', icon: 'today.gif' },
  { key: 'next-month', icon: 'right.png' }
]

const changeMonth = (val: string) => {
  calendarRef.value!.selectDate(val)
}

const judgeIsLaterMonth = (data: IDateCell) => {
  return dayjs(data.date) > dayjs(new Date()) && dayjs(new Date()).month() < dayjs(data.date).month()
}

const judgeIsLearn = (data: IDateCell) => {
  return dayjs(data.date).isBefore(dayjs(new Date()).startOf('day')) && dayjs(data.date).date() % 2 !== 0
}

const judgeIsRest = (data: IDateCell) => {
  return dayjs(data.date).isBefore(dayjs(new Date()).startOf('day')) && dayjs(data.date).date() % 2 === 0
}

watch(
  curSelectDay,
  (newValue) => {
    emitter.emit('calendar2board', dayjs(newValue).format('YYYY-MM-DD'))
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<style scoped lang='less'>
.el-calendar {
  border-radius: 15px;
  box-shadow: 0 0 20px 5px #efefef;
  //box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);

  .headerDate {
    font-size: 18px;
    font-weight: bold;
    line-height: 30px;
    color: #444;
  }

  .dateCell {
    font-size: 50px;
    font-weight: bold;
    color: #aaa;
  }

  .laterMonth {
    color: #eee;
  }

  .learn {
    color: darkcyan;
  }

  .rest {
    color: orangered;
  }

  :deep(.el-calendar-day) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90px;
  }

  :deep(th) {
    font-style: oblique;
  }
}
</style>
