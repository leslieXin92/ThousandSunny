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
  />
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
        { label: 'public', value: 'public' },
        { label: 'private', value: 'private' }
      ]
    }
  }
]

const tableHeader: JTableHeaderType = [
  { attrs: { type: 'serialNumber', label: 'Serial Number', width: 130 } },
  { attrs: { prop: 'blogName', label: 'Blog Name' } },
  { attrs: { prop: 'publishTime', label: 'Publish Time' } },
  { attrs: { prop: 'visibility', label: 'Visibility' } },
  { attrs: { type: 'operate', label: 'Operation' } }
]

const originTableData = ref([
  { id: 1, blogName: 'Blog NO 1', publishTime: '2023-01-03', visibility: 'public' },
  { id: 2, blogName: 'Blog NO 2', publishTime: '2023-01-04', visibility: 'public' },
  { id: 3, blogName: 'Blog NO 1', publishTime: '2023-01-03', visibility: 'public' },
  { id: 4, blogName: 'Blog NO 1', publishTime: '2023-01-03', visibility: 'public' }
])

const tableData = cloneDeep(originTableData)

const modelChangeCallback = (model: Record<string, unknown>) => {
  const { blogName } = model
  tableData.value = originTableData.value.filter(item => item.blogName.indexOf(blogName as string) !== -1)
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
