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
        :class='{
          learn: isLearn(data),
          lazy: isLazy(data),
          notBelongCurMonth: isNotBelongCurMonth(data)
        }'
        class='dateCell'
      >
        {{ data?.day.split('-')[2] }}
      </div>
    </template>
  </el-calendar>
</template>

<script setup lang='ts'>
import { ref, watch, onMounted } from 'vue'
import emitter from '@/utils/mitt'
import { ElCalendar } from 'element-plus'
import dayjs from 'dayjs'
import { IDateCell } from './type'

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

// 学习
const isLearn = (data: IDateCell) => {
  const dateDataArr = [
    '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06', '2023-01-07',
    '2023-01-09', '2023-01-10', '2023-01-11', '2023-01-12', '2023-01-13',
    '2023-01-14', '2023-01-15', '2023-01-16', '2023-01-17', '2023-01-18',
    '2023-01-19', '2023-01-20', '2023-01-28', '2023-01-29', '2023-01-30',
    '2023-02-02'
  ]
  return dateDataArr.indexOf(dayjs(data.date).format('YYYY-MM-DD')) !== -1
}

// 未学习
const isLazy = (data: IDateCell) => {
  const dateDataArr = [
    '2023-01-01', '2023-01-02', '2023-01-08', '2023-01-21', '2023-01-22',
    '2023-01-23', '2023-01-24', '2023-01-25', '2023-01-26', '2023-01-27',
    '2023-01-31', '2023-02-01'
  ]
  return dateDataArr.indexOf(dayjs(data.date).format('YYYY-MM-DD')) !== -1
}

// 不属于当前显示月份的
const isNotBelongCurMonth = (data: IDateCell) => {
  return dayjs(data.date).isAfter(dayjs(curSelectDay.value).endOf('month'))
    || dayjs(data.date).isBefore(dayjs(curSelectDay.value).startOf('month'))
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

  .learn {
    color: darkcyan;
  }

  .lazy {
    color: #F55050;
  }

  .notBelongCurMonth {
    opacity: 0.3;
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
