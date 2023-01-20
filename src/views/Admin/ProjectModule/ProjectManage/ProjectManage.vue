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
import JForm from '@/components/JForm/JForm.vue'
import JTable from '@/components/JTable/JTable.vue'
import JDialog from '@/components/JDialog/JDialog.vue'
import useQueryTableData from '@/hooks/useQueryTableData'
import useTableOperate from '@/hooks/useTableOperate'
import { schema, tableHeader } from './config'
import { mockQueryTableData } from './mock'

const { tableData, modelChangeCallback } = useQueryTableData(mockQueryTableData)

const viewProject = (onlineAddress: string) => {
  window.open(onlineAddress)
}

const editProject = () => {
  console.log('editProject', curId.value)
}

const editConfirm = () => {
  console.log('editConfirm', curId.value)
}

const deleteConfirm = () => {
  console.log('deleteConfirm', curId.value)
}

const { title, visible, curId, operate, openDialog } = useTableOperate(editProject, editConfirm, deleteConfirm)
</script>

<style scoped lang='less'>
</style>
