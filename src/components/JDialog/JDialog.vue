<template>
  <el-dialog
    :modelValue='dialogVisible'
    :title='title'
    :width='width'
    style='border-radius: 10px'
    center
    destroyOnClose
    @open='open'
    @close='close'
  >
    <slot />

    <template #footer>
      <slot name='footer'>
        <el-button @click="handleOperate('cancel')">Cancel</el-button>
        <el-button color='#008b8b' @click="handleOperate('confirm')">Confirm</el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'
import { clone } from 'lodash'
import { OperateType } from './type'

interface IProps {
  visible: boolean
  title: string
  width?: string | number
}

interface IEmits {
  (e: 'changeVisible', newVisible: boolean): void

  (e: 'operate', type: OperateType): void
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

const handleOperate = (type: OperateType) => {
  emits('operate', type)
}
</script>

<style scoped lang='less'>
.el-button {
  margin: 0 20px;
}
</style>
