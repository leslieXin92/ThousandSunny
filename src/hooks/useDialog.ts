import { ref, Ref } from 'vue'

interface IProps {
  visible: Ref<boolean>
  dialogConfirmCb: any
  dialogCancelCb: any
}

export const useDialog = (visible: Ref<boolean>, dialogConfirmCb: any, dialogCancelCb: any) => {
  const curDialogType = ref('')

  const changeVisible = (newVisible: boolean) => {
    visible.value = newVisible
  }

  // 编辑
  const editBlog = (type: string, id: number) => {
    curDialogType.value = type
    visible.value = true
    console.log('editBlog', id)
  }

  // 删除
  const deleteBlog = (type: string, id: number) => {
    curDialogType.value = type
    visible.value = true
    console.log('deleteBlog', id)
  }

  // 弹窗确认
  const operate = async (type: 'cancel' | 'confirm') => {
    if (type === 'cancel') return visible.value = false
    const data = curDialogType.value === 'Edit'
      ? dialogConfirmCb()
      : dialogCancelCb()
    console.log(data)
    visible.value = false
  }

  return {
    changeVisible,
    editBlog,
    deleteBlog,
    operate
  }
}
