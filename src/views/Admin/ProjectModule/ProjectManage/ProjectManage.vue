<template>
  <JForm
    :schema='schema'
    @modelChangeCallback='modelChangeCallback'
    inline
  />
  <JTable
    :tableHeader='tableHeader'
    :tableData='tableData'
    @editItem='editBlogItem'
    @deleteItem='deleteBlogItem'
  >
    <template #onlineAddress='{scope}'>
      <el-button link>{{ scope.row.onlineAddress }}</el-button>
    </template>
  </JTable>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import JForm from '@/components/JForm/JForm.vue'
import JTable from '@/components/JTable/JTable.vue'
import { cloneDeep } from 'lodash'
import { ISchema } from '@/components/JForm/type'
import { JTableHeaderType } from '@/components/JTable/type'

const schema: ISchema[] = [
  {
    component: 'input',
    key: 'projectName',
    itemAttrs: {
      label: 'project name'
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
      placeholder: 'all',
      options: []
    }
  }
]

const tableHeader: JTableHeaderType = [
  { attrs: { type: 'serialNumber', label: 'Serial Number', width: 130 } },
  { attrs: { prop: 'projectName', label: 'Project Name' } },
  { attrs: { prop: 'startTime', label: 'Start Time' } },
  { attrs: { prop: 'endTime', label: 'End Time' } },
  { attrs: { prop: 'timeSpent', label: 'Time Spent' } },
  { attrs: { prop: 'onlineAddress', label: 'Online Address' }, custom: true },
  { attrs: { type: 'operate', label: 'Operation' } }
]

const originTableData = ref([
  {
    id: 1,
    projectName: 'Blog NO 1',
    startTime: '2023-01-03',
    endTime: '2023-01-03',
    timeSpent: '30',
    onlineAddress: 'https://www.baidu.com'
  },
  {
    id: 2,
    projectName: 'Blog NO 2',
    startTime: '2023-01-04',
    endTime: '2023-01-04',
    timeSpent: '30',
    onlineAddress: 'https://www.baidu.com'
  },
  {
    id: 3,
    projectName: 'Blog NO 1',
    startTime: '2023-01-03',
    endTime: '2023-01-03',
    timeSpent: '30',
    onlineAddress: 'https://www.baidu.com'
  },
  {
    id: 4,
    projectName: 'Blog NO 1',
    startTime: '2023-01-03',
    endTime: '2023-01-03',
    timeSpent: '30',
    onlineAddress: 'https://www.baidu.com'
  }
])

const tableData = cloneDeep(originTableData)

const modelChangeCallback = (model: Record<string, unknown>) => {
  console.log(model)
}

const editBlogItem = (id: number) => {
  console.log('edit', id)
}

const deleteBlogItem = (id: number) => {
  console.log('delete', id)
}
</script>

<style scoped lang='less'>
</style>
