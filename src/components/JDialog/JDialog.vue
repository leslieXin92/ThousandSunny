<template>
  <el-dialog
    :modelValue='dialogVisible'
    :width='props.width'
    :showClose='false'
    style='border-radius: 10px'
    center
    destroyOnClose
    @open='open'
    @close='close'
  >
    <template #header>
      <div class='title' @contextmenu='handleClickTitle'>{{ title }}</div>
    </template>

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

  (e: 'titleClickCallback'): void
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

const handleClickTitle = (event: Event) => {
  event.preventDefault()
  emits('titleClickCallback')
}

const handleOperate = (type: OperateType) => {
  emits('operate', type)
}
</script>

<style scoped lang='less'>
.title {
  width: 100px;
  margin: 0 auto;
  font-size: 20px;
  font-weight: bold;
  color: darkcyan;
}

.el-button {
  margin: 0 20px;
}
</style>
