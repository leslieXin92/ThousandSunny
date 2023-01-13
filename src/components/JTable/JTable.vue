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
          <slot :name='item.attrs.prop ?? item.attrs.type' :scope='scope'></slot>
        </template>
        <!--序号-->
        <template v-else-if="item.attrs.type === 'serialNumber'">
          {{ scope.$index }}
        </template>
        <template v-else-if="item.attrs.type === 'operate'">
          <slot name='operate' :scope='scope'></slot>
        </template>
        <!--正常-->
        <template v-else>
          <span>{{ scope.row[item.attrs.prop] }}</span>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang='ts'>
import { Ref } from 'vue'
import { JTableHeaderType, JTableDataType } from './type'

interface IProps {
  tableHeader: JTableHeaderType
  tableData?: Ref<JTableDataType> | JTableDataType
}

withDefaults(defineProps<IProps>(), {
  tableData: () => []
})
</script>

<style scoped lang='less'>
.el-table {
  width: 100%;
  margin: 15px auto;
  border-radius: 10px;
}
</style>
