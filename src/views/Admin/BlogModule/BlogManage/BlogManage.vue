<template>
  <JForm
    :schema='schema'
    @modelChangeCallback='modelChangeCallback'
    inline
  />

  <JTable :tableHeader='tableHeader' :tableData='tableData'>
    <template #visibility='{scope}'>
      {{ scope.row.visibility }}
      {{ scope.row.visibility }}
    </template>

    <template #operate='{scope}'>
      <el-button
        type='primary'
        size='small'
        link
        @click="editBlog('Edit',scope.row.id)"
      >
        edit
      </el-button>
      <el-button
        type='danger'
        size='small'
        link
        @click="deleteBlog('Delete',scope.row.id)"
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
import { ISchema } from '@/components/JForm/type'
import { JTableHeaderType, JTableDataType } from '@/components/JTable/type'

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
      placeholder: 'all',
      options: []
    }
  },
  {
    component: 'select',
    key: 'visibility',
    itemAttrs: {
      label: 'visibility'
    },
    attrs: {
      placeholder: 'all',
      options: [
        { label: 'public', value: 0 },
        { label: 'private', value: 1 }
      ]
    }
  }
]

const tableHeader: JTableHeaderType = [
  { attrs: { type: 'serialNumber', label: 'Serial Number', width: 130 } },
  { attrs: { prop: 'blogName', label: 'Blog Name' } },
  { attrs: { prop: 'category', label: 'Category' } },
  { attrs: { prop: 'publishTime', label: 'Publish Time' } },
  { attrs: { prop: 'visibility', label: 'Visibility' }, filterMap: { 0: 'public', 1: 'private' } },
  { attrs: { type: 'operate', label: 'Operation' } }
]

const tableData = ref<JTableDataType>([])

const modelChangeCallback = (model: Record<string, unknown>) => {
  console.log(model)
  console.log(`已刷新tableData`)
  console.log('')
  tableData.value = [
    { id: 1, blogName: 'Blog NO 1', category: 'Node', publishTime: '2023-01-03', visibility: 0 },
    { id: 2, blogName: 'Blog NO 2', category: 'Node', publishTime: '2023-01-04', visibility: 1 },
    { id: 3, blogName: 'Blog NO 1', category: 'Node', publishTime: '2023-01-03', visibility: 1 },
    { id: 4, blogName: 'Blog NO 1', category: 'Node', publishTime: '2023-01-03', visibility: 0 }
  ]
}

const visible = ref(false)
const curDialogType = ref('')

const changeVisible = (newVisible: boolean) => {
  visible.value = newVisible
}

// 编辑
const editBlog = (type: string, id: number) => {
  curDialogType.value = type
  visible.value = true
  console.log('editBlog', id)
}

// 删除
const deleteBlog = (type: string, id: number) => {
  curDialogType.value = type
  visible.value = true
  console.log('deleteBlog', id)
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
