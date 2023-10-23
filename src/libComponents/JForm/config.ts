import type {
  InputProps,
  DatePickerProps,
  InputEmits,
  ISelectProps,
  SwitchProps
} from 'element-plus'

export const formItemMap = {
  'input': 'el-input',
  'select': 'el-select',
  'datePicker': 'ElDatePicker',
  'switch': 'ElSwitch'
}

export type SchemaAttrsType = {
  'input': Partial<InputProps> & Partial<InputEmits> | any // TODO - type
  'select': Partial<ISelectProps>
  'datePicker': Partial<DatePickerProps>
  'switch': Partial<SwitchProps>
}
