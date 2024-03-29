export type OperateType = 'cancel' | 'confirm'

export interface TitleContextMenuItem {
  label: string
  callback: () => void
}
