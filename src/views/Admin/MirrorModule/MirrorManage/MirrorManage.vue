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
        view
      </el-button>
    </template>

    <template #operate='{scope}'>
      <el-button
        type='primary'
        size='small'
        link
        @click="editShard('Edit',scope.row.id)"
      >
        edit
      </el-button>
      <el-button
        type='danger'
        size='small'
        link
        @click="deleteShard('Delete',scope.row.id)"
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
    key: 'taskName',
    itemAttrs: {
      label: 'Task Name'
    },
    attrs: {}
  },
  {
    component: 'datePicker',
    key: 'date',
    itemAttrs: {
      label: 'Date'
    },
    attrs: {
      type: 'daterange',
      rangeSeparator: '-',
      startPlaceholder: 'Start date',
      endPlaceholder: 'End date'
    }
  }
]

const tableHeader: JTableHeaderType = [
  { attrs: { type: 'serialNumber', label: 'Serial Number', width: 150 } },
  { attrs: { prop: 'date', label: 'Date' } },
  { attrs: { prop: 'taskName', label: 'Task Name' } },
  { attrs: { prop: 'taskDetails', label: 'Task Details' }, custom: true },
  { attrs: { type: 'operate', label: 'Operation' } }
]

const originTableData = ref([
  { id: 1, date: '2023-01-03', taskName: 'node' },
  { id: 2, date: '2023-01-04', taskName: 'webpack' },
  { id: 3, date: '2023-01-03', taskName: 'mini-vue3' },
  { id: 4, date: '2023-01-03', taskName: 'react' }
])

const tableData = cloneDeep(originTableData)

const modelChangeCallback = (model: Record<string, unknown>) => {
  const { taskName } = model
  tableData.value = originTableData.value.filter(item => item.taskName.indexOf(taskName as string) !== -1)
}

const visible = ref(false)
const curDialogType = ref('')

const changeVisible = (newVisible: boolean) => {
  visible.value = newVisible
}

// 查看
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

// 编辑
const editShard = (type: string, id: number) => {
  curDialogType.value = type
  visible.value = true
  console.log('editShard', id)
}

// 删除
const deleteShard = (type: string, id: number) => {
  curDialogType.value = type
  visible.value = true
  console.log('deleteShard', id)
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
