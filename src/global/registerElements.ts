import { App } from 'vue'
import 'element-plus/theme-chalk/index.css'
import {
  ElContainer,
  ElHeader,
  ElMain,
  ElFooter,
  ElPopover,
  ElButton,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput
} from 'element-plus'

const components = [
  ElContainer,
  ElHeader,
  ElMain,
  ElFooter,
  ElPopover,
  ElButton,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput
]

export default function(app: App<Element>): void {
  for (const cpn of components) {
    app.component(cpn.name, cpn)
  }
}
