<template>
  <el-select v-bind='$attrs'>
    <el-option
      v-for='item in options'
      :key='item.value'
      v-bind='item'
    />
  </el-select>
</template>

<script setup='props' lang='ts'>
import { ISelectOption } from './type'

interface IProps {
  options: ISelectOption[]
}

defineProps<IProps>()
</script>
