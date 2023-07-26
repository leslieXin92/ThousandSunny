import { ISchema } from '@/components/JForm/type'

export const schema: ISchema[] = [
  {
    component: 'switch',
    key: 'type',
    itemAttrs: {
      label: 'public'
    },
    attrs: {
      inactiveValue: 'private',
      activeValue: 'public'
    }
  }
]
