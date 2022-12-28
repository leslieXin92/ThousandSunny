import { InputProps, ISelectProps, SwitchProps } from 'element-plus'

export const formItemMap = {
  'input': 'el-input',
  'select': 'el-select',
  'switch': 'el-switch'
}

export type SchemaAttrsType = {
  'input': Partial<InputProps>
  'select': Partial<ISelectProps>
  'switch': Partial<SwitchProps>
}
