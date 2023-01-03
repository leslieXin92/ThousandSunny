<template>
  <JForm :schema='schema' inline />
  <JTable :tableHeader='tableHeader' :tableData='tableData'>
    <template #coop>
      <el-button size='small'>edit</el-button>
      <el-button size='small'>delete</el-button>
    </template>
  </JTable>
</template>

<script setup lang='ts'>
import JForm from '@/components/JForm/JForm.vue'
import JTable from '@/components/JTable/JTable.vue'
import { ISchema } from '@/components/JForm/type'
import { JTableHeaderType } from '@/components/JTable/type'

const schema: ISchema[] = [
  {
    component: 'input',
    key: 'blogName',
    itemAttrs: {
      label: 'blog name'
    },
    attrs: {}
  },
  {
    component: 'select',
    key: 'publishYear',
    itemAttrs: {
      label: 'publish year'
    },
    attrs: {
      options: []
    }
  }
]

const tableHeader: JTableHeaderType = [
  { attrs: { prop: 'serialNumber', label: 'Serial Number' } },
  { attrs: { prop: 'blogName', label: 'Blog Name' } },
  { attrs: { prop: 'publishTime', label: 'Publish Time' } },
  { attrs: { prop: 'visibility', label: 'Visibility' } },
  { attrs: { prop: 'coop', label: 'Operation' }, custom: true }
]

const tableData = [
  { serialNumber: '1', blogName: '元旦收假第一天', publishTime: '2023-01-3', visibility: 'public' },
  { serialNumber: '1', blogName: '元旦收假第一天', publishTime: '2023-01-3', visibility: 'public' },
  { serialNumber: '1', blogName: '元旦收假第一天', publishTime: '2023-01-3', visibility: 'public' },
  { serialNumber: '1', blogName: '元旦收假第一天', publishTime: '2023-01-3', visibility: 'public' }
]
</script>

<style scoped lang='less'>
</style>
