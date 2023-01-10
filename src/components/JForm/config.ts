import JSelect from '@/components/JFormItem/JSelect/JSelect.vue'
import { InputProps, InputEmits, ISelectProps } from 'element-plus'
import { DatePickerProps } from 'element-plus/lib/components/date-picker/src/props/date-picker'

export const formItemMap = {
  'input': 'el-input',
  'select': JSelect,
  'datePicker': 'ElDatePicker'
}

export type SchemaAttrsType = {
  'input': Partial<InputProps> & Partial<InputEmits> | any // TODO - type
  'select': Partial<ISelectProps>
  'datePicker': Partial<DatePickerProps>
}
