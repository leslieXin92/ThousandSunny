<template>
  <JForm
    :schema='schema'
    @modelChangeCallback='modelChangeCallback'
    inline
  />

  <JTable :tableHeader='tableHeader' :tableData='tableData'>
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
import { schema, tableHeader } from './config.ts'
import { JTableDataType } from '@/components/JTable/type'

const tableData = ref<JTableDataType>([])

const modelChangeCallback = (model: Record<string, unknown>) => {
  console.log(`\n`, model)
  console.log(`接口刷新tableData`)
  tableData.value = [
    { id: 1, blogName: 'Blog NO 1', category: 'Node', publishTime: '2023-01-03', visibility: 0 },
    { id: 2, blogName: 'Blog NO 2', category: 'Node', publishTime: '2023-01-04', visibility: 1 },
    { id: 3, blogName: 'Blog NO 1', category: 'Node', publishTime: '2023-01-03', visibility: 1 },
    { id: 4, blogName: 'Blog NO 1', category: 'Node', publishTime: '2023-01-03', visibility: 0 }
  ]
}

const editBlog = () => {
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

const { title, visible, curId, operate, openDialog } = useTableOperate(editBlog, editConfirm, deleteConfirm)
</script>

<style scoped lang='less'>
</style>
