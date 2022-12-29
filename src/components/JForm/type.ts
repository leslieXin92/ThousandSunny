import { formItemMap, SchemaAttrsType } from './config'
import { FormItemProps } from 'element-plus'

type SchemaComType = keyof typeof formItemMap

export interface ISchema {
  component: SchemaComType
  key: string
  itemAttrs?: Partial<FormItemProps>
  attrs?: SchemaAttrsType[SchemaComType]
}

export interface IJFrom {
  getFormData: () => Record<string, any>
  setFormData: (key: string, value: unknown) => void
  reset: () => void
  validate: () => Promise<boolean>
}
