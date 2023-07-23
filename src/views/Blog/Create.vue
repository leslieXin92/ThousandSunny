<template>
  <div class='createBlogPage'>
    <el-input
      v-model='title'
      maxlength='15'
      size='large'
      prefix-icon=''
      class='el-input--suffix'
    />

    <MDEditor
      class='MDEditor'
      :value='context'
      @change='changeContext'
    />

    <el-button
      type='primary'
      @click='submit'
      color='darkcyan'
    >
      提交
    </el-button>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import MDEditor from '@/components/MDEditor/MDEditor.vue'

const title = ref<string>()
const context = ref('## 写在前面\n\n实用性：0/5\n\n有趣程度：5/5\n\n')

const changeContext = (value: string) => {
  context.value = value
}

const submit = () => {
  console.log('title', title.value)
  console.log('context', context.value)
}
</script>

<style scoped lang='less'>
.createBlogPage {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: calc(100vh - 196px);

  :deep(.el-input) {
    width: 400px;
    justify-items: flex-start;
  }

  :deep(.el-input__wrapper) {
    box-shadow: none;
    border-bottom: 1px solid darkcyan;
  }

  :deep(.el-input__inner) {
    font-size: 24px;
    text-align: center;
    font-weight: bold;
    color: darkcyan;
  }

  .MDEditor {
    width: 100%;
    height: calc(100% - 150px);
  }

  .el-button {
    width: 250px;
    height: 50px;
    border-radius: 10px;
  }
}
</style>