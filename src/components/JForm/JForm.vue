<template>
  <el-form
    ref='formRef'
    :model='model'
    v-bind='$attrs'
  >
    <el-form-item
      v-for='item in schema'
      :key='item.key'
      v-bind='item.itemAttrs'
      :prop='item.key'
    >
      <component
        :is='item.component'
        v-bind='{ ...item.attrs, ...$attrs }'
        v-model='model[item.key]'
        :data='model[item.key]'
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { FormInstance } from 'element-plus'
import { ISchema } from './type'

interface IProps {
  schema: ISchema[]
  defaultFormData?: object // TODO - 类型
}

const props = withDefaults(defineProps<IProps>(), {
  defaultFormData: (props) => {
    const { schema } = props
    return schema.reduce((pre, cur) => ({ ...pre, [cur.key]: '' }), {})
  }
})

const formRef = ref<FormInstance>()

const model: any = reactive({ ...props.defaultFormData }) // TODO - 类型

// 获取表单数据
const getFormData = () => {
  return model
}

// 修改表单数据
const setFormData = (key: string, value: any) => {
  model[key] = value
}

// 重置表单
const reset = () => {
  formRef.value!.resetFields()
}

// 表单验证
const validate = async () => {
  return await formRef.value!.validate()
}

defineExpose({
  getFormData,
  setFormData,
  reset,
  validate
})
</script>
