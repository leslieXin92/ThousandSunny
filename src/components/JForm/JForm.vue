<template>
  <el-form
    ref='formRef'
    :model='model'
    v-bind='$attrs'
    labelSuffix=' :'
    hideRequiredAsterisk
  >
    <el-form-item
      v-for='item in schema'
      :key='item.key'
      v-bind='item.itemAttrs'
      :prop='item.key'
    >
      <component
        :is='formItemMap[item.component]'
        v-bind='{ ...item.attrs }'
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
import { formItemMap } from './config'
import { cloneDeep } from 'lodash'

interface IProps {
  schema: ISchema[]
  defaultFormData?: Record<string, unknown>
}

const props = withDefaults(defineProps<IProps>(), {
  defaultFormData: (props) => {
    const { schema } = props
    return schema.reduce((pre, cur) => ({ ...pre, [cur.key]: '' }), {})
  }
})

const formRef = ref<FormInstance>()

const model: Record<string, unknown> = reactive(cloneDeep(props.defaultFormData))

// 获取表单数据
const getFormData = () => {
  return model
}

// 修改表单数据
const setFormData = (key: keyof typeof model, value: unknown) => {
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

<style scoped lang='less'>
.el-form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 10px;
  background-color: #fff;

  .el-form-item {
    margin: 15px;
  }
}
</style>
