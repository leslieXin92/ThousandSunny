import { Ref } from 'vue'

export interface IMenuItem {
  label: string
  routePath: string
  condition: boolean | Ref<Boolean>
}
