import { App } from 'vue'
import registerElements from './registerElements'
// import registerIcons from '@/global/registerIcons'

export function globalRegister(app: App<Element>): void {
  registerElements(app)
  // registerIcons(app)
}
