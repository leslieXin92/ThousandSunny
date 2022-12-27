export interface ISchema {
  component: string
  key: string
  itemAttrs?: object // TODO - 类型
  attrs?: object // TODO - 类型
}

export interface IJFrom {
  getFormData: () => any // TODO - 类型
  setFormData: (key: string, value: any) => void
  reset: () => void
  validate: () => Promise<boolean>
}