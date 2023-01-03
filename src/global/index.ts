import { App } from 'vue'
import registerElements from './registerElements'

export function globalRegister(app: App<Element>): void {
  registerElements(app)
}
