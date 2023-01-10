<template>
  <el-table v-bind='$attrs' :data='tableData'>
    <el-table-column
      v-for='item in tableHeader'
      :key='item.attrs.prop'
      v-bind='item.attrs'
      align='center'
    >
      <!--table header-->
      <template #header='scope' v-if="item.attrs.type !== 'selection'">
        <template v-if='item.customHeader'>
          <slot :name='`${item.attrs.prop}Header`' :scope='scope'></slot>
        </template>
        <template v-else>
          <span>{{ item.attrs.label }}</span>
        </template>
      </template>

      <!--table body-->
      <template v-slot='scope' v-if="item.attrs.type !== 'selection'">
        <!--插槽-->
        <template v-if='item.custom === true'>
          <slot :name='item.attrs.prop' :scope='scope'></slot>
        </template>
        <!--序号-->
        <template v-else-if="item.attrs.type === 'serialNumber'">
          {{ scope.$index }}
        </template>
        <!--操作-->
        <template v-else-if="item.attrs.type === 'operate'">
          <el-button type='primary' size='small' link @click='editItem(scope.row.id)'>edit</el-button>
          <el-button type='danger' size='small' link @click='deleteItem(scope.row.id)'>delete</el-button>
        </template>
        <!--正常-->
        <template v-else>
          <span>{{ scope.row[item.attrs.prop] }}</span>
        </template>
      </template>
    </el-table-column>

  </el-table>

  <JDialog title='111' :visible='visible' @changeVisible='changeVisible'></JDialog>
</template>

<script setup lang='ts'>
import { ref, Ref } from 'vue'
import JDialog from '@/components/JDialog/JDialog.vue'
import { JTableHeaderType, JTableDataType } from './type'

interface IProps {
  tableHeader: JTableHeaderType
  tableData?: Ref<JTableDataType> | JTableDataType
}

interface IEmits {
  (e: 'editItem', id: number): void

  (e: 'deleteItem', id: number): void
}

withDefaults(defineProps<IProps>(), {
  tableData: () => []
})

const emits = defineEmits<IEmits>()

const visible = ref(false)

const editItem = (id: number) => {
  emits('editItem', id)
  visible.value = true
}

const deleteItem = (id: number) => {
  emits('deleteItem', id)
  visible.value = true
}

const changeVisible = (newVisible: boolean) => {
  visible.value = newVisible
}
</script>

<style scoped lang='less'>
.el-table {
  width: 100%;
  margin: 15px auto;
  border-radius: 10px;
}
</style>
