<template>
  <el-dialog
    :modelValue='dialogVisible'
    :title='title'
    :width='width'
    center
    destroyOnClose
    @open='open'
    @close='close'
  >
  </el-dialog>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'
import { clone } from 'lodash'

interface IProps {
  visible: boolean
  title: string
  width?: string | number
}

interface IEmits {
  (e: 'changeVisible', newVisible: boolean): void
}

const props = withDefaults(defineProps<IProps>(), {
  width: '500px'
})

const emits = defineEmits<IEmits>()

const dialogVisible = ref(clone(props.visible))

watch(() => props.visible, (newValue: boolean) => {
  dialogVisible.value = newValue
  emits('changeVisible', newValue)
})

const open = () => {
  emits('changeVisible', true)
}
const close = () => {
  emits('changeVisible', false)
}
</script>

<style scoped lang='less'>
.el-dialog {
  border-radius: 10px;
}
</style>
