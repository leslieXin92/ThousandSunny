import { formItemMap } from './config'
import type {
  FormItemProps,
  InputProps,
  DatePickerProps,
  InputEmits,
  ISelectProps,
  SwitchProps,
  UploadProps
} from 'element-plus'

type SchemaComType = keyof typeof formItemMap

export interface SchemaAttrs {
  'input': Partial<InputProps> & Partial<InputEmits> | any // TODO - type
  'select': Partial<ISelectProps>
  'datePicker': Partial<DatePickerProps>
  'switch': Partial<SwitchProps>
  'upload': Partial<UploadProps>
}

export interface Schema {
  component: SchemaComType
  key: string
  itemAttrs?: Partial<FormItemProps>
  attrs?: SchemaAttrs[SchemaComType]
  custom?: boolean
  hide?: boolean
}

export interface JFormRef {
  getFormData: () => Record<string, any>
  setFormData: (key: string, value: unknown) => void
  reset: () => void
  validate: () => Promise<boolean>
}
