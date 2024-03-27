import JSelect from '@/libComponents/JFormItem/JSelect/index.vue'
import JUpload from '@/libComponents/JFormItem/JUpload/index.vue'

export const formItemMap = {
  'input': 'el-input',
  'select': JSelect,
  'datePicker': 'ElDatePicker',
  'switch': 'ElSwitch',
  'upload': JUpload
}
