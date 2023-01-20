<template>
  <JForm
    :schema='schema'
    @modelChangeCallback='modelChangeCallback'
    inline
  />

  <JTable :tableHeader='tableHeader' :tableData='tableData'>
    <template #onlineAddress='{scope}'>
      <el-button
        type='primary'
        size='small'
        link
        @click='viewProject(scope.row.onlineAddress)'
      >
        view
      </el-button>
    </template>

    <template #operate='{scope}'>
      <el-button
        type='primary'
        size='small'
        link
        @click="openDialog('edit', scope.row.id)"
      >
        edit
      </el-button>
      <el-button
        type='danger'
        size='small'
        link
        @click="openDialog('delete', scope.row.id)"
      >
        delete
      </el-button>
    </template>
  </JTable>

  <JDialog
    :title='title'
    :visible='visible'
    @operate='operate'
  >
    <div>Are you sure {{ title }} it ?</div>
  </JDialog>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import JForm from '@/components/JForm/JForm.vue'
import JTable from '@/components/JTable/JTable.vue'
import JDialog from '@/components/JDialog/JDialog.vue'
import { useTableOperate } from '@/hooks/useTableOperate'
import { schema, tableHeader } from './config'
import { JTableDataType } from '@/components/JTable/type'

const tableData = ref<JTableDataType>([])

const modelChangeCallback = (model: Record<string, unknown>) => {
  console.log(`\n`, model)
  console.log(`接口刷新tableData`)
  tableData.value = [
    {
      id: 1,
      projectName: 'Blog NO 1',
      technologyStack: 'Koa2',
      startTime: '2023-01-03',
      endTime: '2023-01-03',
      timeSpent: '30',
      onlineAddress: 'https://www.baidu.com'
    },
    {
      id: 2,
      projectName: 'Blog NO 2',
      technologyStack: 'Koa2',
      startTime: '2023-01-04',
      endTime: '2023-01-04',
      timeSpent: '30',
      onlineAddress: 'https://www.baidu.com'
    },
    {
      id: 3,
      projectName: 'Blog NO 1',
      technologyStack: 'Koa2',
      startTime: '2023-01-03',
      endTime: '2023-01-03',
      timeSpent: '30',
      onlineAddress: 'https://www.baidu.com'
    },
    {
      id: 4,
      projectName: 'Blog NO 1',
      technologyStack: 'Koa2',
      startTime: '2023-01-03',
      endTime: '2023-01-03',
      timeSpent: '30',
      onlineAddress: 'https://www.baidu.com'
    }
  ]
}

const viewProject = (onlineAddress: string) => {
  window.open(onlineAddress)
}

const editProject = () => {
  console.log(curId.value)
  return new Promise((resolve) => {
    resolve({ code: 0 })
  })
}

const editConfirm = () => {
  console.log(curId.value)
  return new Promise((resolve) => {
    Math.random() * 10 > 5 ? resolve({ code: 0 }) : resolve({ code: 1 })
  })
}

const deleteConfirm = () => {
  console.log(curId.value)
  return new Promise((resolve) => {
    Math.random() * 10 > 5 ? resolve({ code: 0 }) : resolve({ code: 1 })
  })
}

const { title, visible, curId, operate, openDialog } = useTableOperate(editProject, editConfirm, deleteConfirm)
</script>

<style scoped lang='less'>
</style>
