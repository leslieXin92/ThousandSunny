import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { capitalize } from 'lodash'

const useTableOperate = (
  editOpen: () => void,
  editConfirm: () => void,
  deleteConfirm: () => void
) => {

  const title = ref('')
  const visible = ref(false)
  const curId = ref<number>()

  // 打开弹窗
  const openDialog = (type: 'edit' | 'delete', id: number) => {
    title.value = capitalize(type)
    curId.value = id
    visible.value = true
    type === 'edit'
      ? editOpen()
      : null
  }

  // 弹窗确认
  const operate = (type: 'confirm' | 'cancel') => {
    if (type === 'cancel') return visible.value = false
    title.value === 'Edit'
      ? editConfirm()
      : deleteConfirm()
    ElMessage({
      type: 'success',
      message: `${title.value} Success !`
    })
    visible.value = false
    title.value = ''
    curId.value = undefined
  }

  return {
    title,
    visible,
    curId,
    openDialog,
    operate
  }
}

export default useTableOperate
