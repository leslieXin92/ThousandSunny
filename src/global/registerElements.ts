import { App } from 'vue'
import 'element-plus/theme-chalk/index.css'
import {
  ElContainer,
  ElHeader,
  ElMain,
  ElFooter,
  ElButton,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElTable,
  ElTableColumn,
  ElMenu,
  ElSubMenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElCalendar,
  ElCard,
  ElTooltip,
  ElAffix,
  ElPageHeader
} from 'element-plus'

const components = [
  ElContainer,
  ElHeader,
  ElMain,
  ElFooter,
  ElButton,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElTable,
  ElTableColumn,
  ElMenu,
  ElSubMenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElCalendar,
  ElCard,
  ElDatePicker,
  ElTooltip,
  ElAffix,
  ElPageHeader
]

export default function (app: App<Element>): void {
  for (const cpn of components) {
    app.component(cpn.name, cpn)
  }
}
