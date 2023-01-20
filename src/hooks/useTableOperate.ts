import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { capitalize } from 'lodash'

export const useTableOperate = (
  editOpen: () => Promise<any>,
  editConfirm: () => Promise<any>,
  deleteConfirm: () => Promise<any>
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
  const operate = async (type: 'confirm' | 'cancel') => {
    if (type === 'cancel') return visible.value = false
    const { code } = title.value === 'Edit'
      ? await editConfirm()
      : await deleteConfirm()
    if (!code) {
      visible.value = false
      title.value = ''
      curId.value = undefined
    }
    ElMessage({
      type: code ? 'error' : 'success',
      message: `${title.value} ${code ? 'Failure ' : 'Success '}!`
    })
  }

  return {
    title,
    visible,
    curId,
    openDialog,
    operate
  }
}
