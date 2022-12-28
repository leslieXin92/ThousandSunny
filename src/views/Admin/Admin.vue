<template>
  <JTable :tableHeader='tableHeader' :tableData='tableData' />
</template>

<script setup lang='ts'>
import JTable from '@/components/JTable/JTable.vue'

const tableHeader = [
  { attrs: { prop: '', label: '', type: 'selection', width: '50', align: 'center' } },
  { attrs: { prop: 'order', label: '序号' }, custom: true },
  { attrs: { prop: 'username', label: '用户名' } },
  { attrs: { prop: 'password', label: '密码' } },
  { attrs: { prop: 'coop', label: '操作' }, custom: true }
]

const tableData = [
  { order: '1', username: '1', password: '1', coop: '1' },
  { order: '1', username: '1', password: '1', coop: '1' },
  { order: '1', username: '1', password: '1', coop: '1' }
]
</script>

<style scoped lang='less'>
</style>
