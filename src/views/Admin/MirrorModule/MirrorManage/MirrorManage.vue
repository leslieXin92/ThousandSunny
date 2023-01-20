<template>
  <JForm
    :schema='schema'
    @modelChangeCallback='modelChangeCallback'
    inline
  />

  <JTable :tableHeader='tableHeader' :tableData='tableData'>
    <template #taskDetails='{scope}'>
      <el-button
        type='primary'
        link
        @click='viewShard(scope.row.id)'
      >
        details
      </el-button>
    </template>

    <template #operate='{scope}'>
      <el-button
        type='primary'
        size='small'
        link
        @click="openDialog('edit',scope.row.id)"
      >
        edit
      </el-button>
      <el-button
        type='danger'
        size='small'
        link
        @click="openDialog('delete',scope.row.id)"
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
import { schema, tableHeader } from './config'
import { JTableDataType } from '@/components/JTable/type'
import { useTableOperate } from '@/hooks/useTableOperate'

const tableData = ref<JTableDataType>([])

const modelChangeCallback = (model: Record<string, unknown>) => {
  console.log(`\n`, model)
  console.log(`接口刷新tableData`)
  tableData.value = [
    { id: 1, date: '2023-01-03', taskName: 'node' },
    { id: 2, date: '2023-01-04', taskName: 'webpack' },
    { id: 3, date: '2023-01-03', taskName: 'mini-vue3' },
    { id: 4, date: '2023-01-03', taskName: 'react' }
  ]
}

const viewShard = (id: number) => {
  const res = {
    1: [{ name: 'node', list: ['http模块', 'url模块'] }, { name: '个人项目', list: ['calender页面开发'] }],
    2: [{ name: 'webpack', list: ['loader'] }],
    3: [{ name: 'mini-vue3', list: ['reactive原理', 'ref原理'] }],
    4: [{ name: 'jira', list: ['项目列表页面开发'] }]
  }
  const details = res[id as keyof typeof res]
  console.log(details)
}

const editShard = () => {
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

const { title, visible, curId, operate, openDialog } = useTableOperate(editShard, editConfirm, deleteConfirm)
</script>

<style scoped lang='less'>
</style>
