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
import { onUnmounted, reactive } from 'vue'

interface IProps {
  schema: any[]
  defaultFormData?: object
}

const props = withDefaults(defineProps<IProps>(), {
  defaultFormData: (props) => {
    const { schema } = props
    return schema.reduce((pre, cur) => ({ ...pre, [cur.key]: '' }), {})
  }
})

const model: any = reactive({ ...props.defaultFormData }) // TODO - data类型

// 获取表单数据
const getFormData = () => {
  return model
}

// 修改表单数据
const setFormData = (key: string, value: any) => {
  model[key] = value
}

const reset = () => {
}

const validate = () => {
}

defineExpose({
  getFormData,
  setFormData,
  reset,
  validate
})
</script>

<style scoped lang='less'>
</style>
