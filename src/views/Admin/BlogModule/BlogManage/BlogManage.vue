<template>
  <JForm :schema='schema' inline />
  <JTable :tableHeader='tableHeader' :tableData='tableData'>
    <template #operate="{scope}">
      <el-button size='small' @click="editBlogItem(scope.row.id)">edit</el-button>
      <el-button size='small' @click="deleteBlogItem(scope.row.id)">delete</el-button>
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
  { attrs: { type: 'serialNumber', label: 'Serial Number' } },
  { attrs: { prop: 'blogName', label: 'Blog Name' } },
  { attrs: { prop: 'publishTime', label: 'Publish Time' } },
  { attrs: { prop: 'visibility', label: 'Visibility' } },
  { attrs: { prop: 'operate', label: 'Operation' }, custom: true }
]

const tableData = [
  { id: 1, blogName: '元旦收假第一天', publishTime: '2023-01-03', visibility: 'public' },
  { id: 2, blogName: '元旦收假第一天', publishTime: '2023-01-03', visibility: 'public' },
  { id: 3, blogName: '元旦收假第一天', publishTime: '2023-01-03', visibility: 'public' },
  { id: 4, blogName: '元旦收假第一天', publishTime: '2023-01-03', visibility: 'public' }
]

const editBlogItem = (id: number) => {
  console.log('edit', id)
}

const deleteBlogItem = (id: number) => {
  console.log('delete', id)
}
</script>

<style scoped lang='less'>
</style>
