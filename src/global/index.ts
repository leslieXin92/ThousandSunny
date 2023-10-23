import registerElements from './registerElements'
import type { App } from 'vue'

export function globalRegister(app: App<Element>): void {
  registerElements(app)
}
