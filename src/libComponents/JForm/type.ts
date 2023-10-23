import { formItemMap } from './config'
import type { FormItemProps } from 'element-plus'
import type { SchemaAttrsType } from './config'

type SchemaComType = keyof typeof formItemMap

export interface Schema {
  component: SchemaComType
  key: string
  itemAttrs?: Partial<FormItemProps>
  attrs?: SchemaAttrsType[SchemaComType]
  custom?: boolean
}

export interface JFormRef {
  getFormData: () => Record<string, any>
  setFormData: (key: string, value: unknown) => void
  reset: () => void
  validate: () => Promise<boolean>
}
