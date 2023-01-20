import { Ref } from 'vue'

interface IProps {
  title: Ref<string>
  visible: Ref<boolean>
  dialogConfirmCb: () => void
  dialogCancelCb: () => void
}

export const useTableOperate = (
  title: Ref<string>,
  visible: Ref<boolean>,
  editOpen: () => void,
  deleteOpen: () => void,
  editConfirm: () => void,
  deleteConfirm: () => void
) => {
  const changeVisible = (newVisible: boolean) => {
    visible.value = newVisible
  }

  // 编辑
  const editItem = (type: string, id: number) => {
    title.value = type
    visible.value = true
    editOpen()
  }

  // 删除
  const deleteItem = (type: string, id: number) => {
    title.value = type
    visible.value = true
    deleteOpen()
  }

  // 弹窗确认
  const operate = async (type: 'cancel' | 'confirm') => {
    if (type === 'cancel') return visible.value = false
    title.value === 'Edit'
      ? editConfirm()
      : deleteConfirm()
    visible.value = false
  }

  return {
    changeVisible,
    editItem,
    deleteItem,
    operate
  }
}
