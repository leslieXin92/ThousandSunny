import type { Schema } from '@/libComponents/JForm/type'

export const schema: Schema[] = [
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
