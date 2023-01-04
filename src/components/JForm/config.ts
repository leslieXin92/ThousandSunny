import JSelect from '@/components/JFormItem/JSelect/JSelect.vue'
import { InputProps, InputEmits, ISelectProps, SwitchProps } from 'element-plus'

export const formItemMap = {
  'input': 'el-input',
  'select': JSelect,
  'switch': 'el-switch'
}

export type SchemaAttrsType = {
  'input': Partial<InputProps> & Partial<InputEmits> | any // TODO - type
  'select': Partial<ISelectProps>
  'switch': Partial<SwitchProps>
}
