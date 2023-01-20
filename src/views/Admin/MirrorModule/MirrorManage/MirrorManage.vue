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
import JForm from '@/components/JForm/JForm.vue'
import JTable from '@/components/JTable/JTable.vue'
import JDialog from '@/components/JDialog/JDialog.vue'
import useQueryTableData from '@/hooks/useQueryTableData'
import useTableOperate from '@/hooks/useTableOperate'
import { schema, tableHeader } from './config'
import { mockQueryTableData } from './mock'

const { tableData, modelChangeCallback } = useQueryTableData(mockQueryTableData)

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
  console.log('editShard', curId.value)
}

const editConfirm = () => {
  console.log('editConfirm', curId.value)
}

const deleteConfirm = () => {
  console.log('deleteConfirm', curId.value)
}

const { title, visible, curId, operate, openDialog } = useTableOperate(editShard, editConfirm, deleteConfirm)
</script>

<style scoped lang='less'>
</style>
