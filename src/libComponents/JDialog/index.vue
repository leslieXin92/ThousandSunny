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
      <el-tooltip
        v-if="titleContextMenu?.length && isLogin"
        trigger='contextmenu'
        effect='light'
        :showArrow='false'
        v-model:visible="tooltipVisible"
      >
        <div class='title' @contextmenu='handleClickTitle'>{{ title }}</div>

        <template #content>
          <template v-for="(item, index) in titleContextMenu">
            <el-button
              type='primary'
              size='small'
              link
              @click="() => {
                tooltipVisible = false
                item.callback()
              }"
            >
              {{ item.label }}
            </el-button>

            <el-divider v-if="index + 1 !== titleContextMenu.length" border-style='dashed' />
          </template>
        </template>
      </el-tooltip>

      <div v-else class='title' @contextmenu='handleClickTitle'>{{ title }}</div>
    </template>

    <slot />

    <template #footer v-if="showFooter">
      <slot name='footer'>
        <el-button @click="handleOperate('cancel')">Cancel</el-button>
        <el-button
          color='#008b8b'
          :loading="confirmLoading"
          @click="handleOperate('confirm')"
        >
          Confirm
        </el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { clone } from 'lodash'
import { useUserStore } from '@/store/useUserStore'
import type { OperateType, TitleContextMenuItem } from './type'

interface Props {
  visible: boolean
  title: string
  width?: string | number
  showFooter?: boolean
  confirmLoading?: boolean
  titleContextMenu?: TitleContextMenuItem[]
}

interface Emits {
  (e: 'changeVisible', newVisible: boolean): void

  (e: 'operate', type: OperateType): void

  (e: 'titleClickCallback'): void
}

const props = withDefaults(defineProps<Props>(), {
  width: '500px',
  showFooter: true
})

const emits = defineEmits<Emits>()

const userStore = useUserStore()
const { isLogin } = storeToRefs(userStore)

const dialogVisible = ref(clone(props.visible))
const tooltipVisible = ref(false)

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

<style scoped lang='scss'>
.title {
  margin: 0 auto;
  font-size: 20px;
  font-weight: bold;
  color: darkcyan;
}

.el-button {
  margin: 0 20px;
}

.el-popper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .el-button {
    margin: 5px 0;
    width: 50px;
  }

  .el-divider {
    margin: 5px 0;
  }
}
</style>
