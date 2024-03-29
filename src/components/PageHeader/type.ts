import type { Ref } from 'vue'

export interface ContextmenuItem {
  label: string
  condition: boolean | Ref<Boolean>
  routePath?: string
  customClickCallback?: () => void
}

export interface MenuItem {
  label: string
  routePath: string
  condition: boolean | Ref<Boolean>
  contextmenuList?: ContextmenuItem[]
}
