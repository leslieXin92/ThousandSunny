<template>
  <el-form
    ref='formRef'
    :model='model'
    v-bind='$attrs'
    labelSuffix=' :'
    hideRequiredAsterisk
  >
    <template v-for='item in schema'>
      <el-form-item
        v-if="!item.hide"
        :key='item.key'
        v-bind='item.itemAttrs'
        :prop='item.key'
      >
        <template v-if='item.custom'>
          <slot :name='item.key' :data='model[item.key]' />
        </template>

        <template v-else>
          <component
            :is='formItemMap[item.component]'
            clearable
            v-bind='{ ...item.attrs }'
            v-model='model[item.key]'
            :data='model[item.key]'
          />
        </template>
      </el-form-item>
    </template>
  </el-form>
</template>

<script setup lang='ts'>
import { ref, reactive, watch } from 'vue'
import { cloneDeep, debounce } from 'lodash'
import { formItemMap } from './config'
import type { FormInstance } from 'element-plus'
import type { Schema } from './type'

interface Props {
  schema: Schema[]
  defaultFormData?: Record<string, unknown>
}

interface Emits {
  (e: 'modelChangeCallback', model: Record<string, unknown>): void
}

const props = withDefaults(defineProps<Props>(), {
  defaultFormData: (props) => {
    const { schema } = props
    return schema.reduce((pre, cur) => ({ ...pre, [cur.key]: '' }), {})
  }
})

const emits = defineEmits<Emits>()

const formRef = ref<FormInstance>()

const model: Record<string, any> = reactive(cloneDeep(props.defaultFormData))

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

watch(
  model,
  debounce((newVal) => {
    emits('modelChangeCallback', newVal)
  }, 200),
  { immediate: true }
)

defineExpose({
  getFormData,
  setFormData,
  reset,
  validate
})
</script>

<style scoped lang='scss'>
.el-form {
  width: 100%;
  margin: 15px auto;
  border-radius: 10px;

  .el-form-item {
    margin: 15px;
  }
}
</style>
