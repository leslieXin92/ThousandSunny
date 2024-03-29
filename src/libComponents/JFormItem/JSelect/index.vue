<template>
  <ElSelect v-model="selectValue">
    <ElOption
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </ElSelect>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

type Option = { label: string, value: any }

interface Props {
  options: Option[]
  defineOptionValue?: any
}

const props = defineProps<Props>()

const selectValue = ref(props.defineOptionValue)
</script>

<style scoped lang='scss'>
</style>
