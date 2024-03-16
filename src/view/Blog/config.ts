import type { Schema } from '@/libComponents/JForm/type'

export const schema: Schema[] = [
  {
    component: 'switch',
    key: 'visibility',
    itemAttrs: {
      label: 'public'
    },
    attrs: {
      inactiveValue: 'private',
      activeValue: 'public'
    }
  }
]
