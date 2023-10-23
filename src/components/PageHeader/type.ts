import type { Ref } from 'vue'

export interface MenuItem {
  label: string
  routePath: string
  condition: boolean | Ref<Boolean>
  contextmenuList?: MenuItem[]
}
