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
        @click="editProject('Edit',scope.row.id)"
      >
        edit
      </el-button>
      <el-button
        type='danger'
        size='small'
        link
        @click="deleteProject('Delete',scope.row.id)"
      >
        delete
      </el-button>
    </template>
  </JTable>

  <JDialog
    :title='curDialogType'
    :visible='visible'
    @changeVisible='changeVisible'
    @operate='operate'
  >
    <div>Are you sure {{ curDialogType }} it ?</div>
  </JDialog>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import JForm from '@/components/JForm/JForm.vue'
import JTable from '@/components/JTable/JTable.vue'
import JDialog from '@/components/JDialog/JDialog.vue'
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

const tableData = ref()

const modelChangeCallback = (model: Record<string, unknown>) => {
  // query interface and change tableDate
  tableData.value = cloneDeep(originTableData.value)
}

const visible = ref(false)
const curDialogType = ref('')

const changeVisible = (newVisible: boolean) => {
  visible.value = newVisible
}

// 查看
const viewProject = (onlineAddress: string) => {
  window.open(onlineAddress)
}

// 编辑
const editProject = (type: string, id: number) => {
  curDialogType.value = type
  visible.value = true
  console.log('editProject', id)
}

// 删除
const deleteProject = (type: string, id: number) => {
  curDialogType.value = type
  visible.value = true
  console.log('deleteProject', id)
}

// 弹窗确认
const operate = async (type: 'cancel' | 'confirm') => {
  if (type === 'cancel') return visible.value = false
  const data = curDialogType.value === 'Edit'
    ? 'edit success!'
    : 'delete success!'
  console.log(data)
  visible.value = false
}
</script>

<style scoped lang='less'>
</style>
