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
      v-model='content'
    />

    <el-button
      type='primary'
      color='darkcyan'
      @click='submit'
    >
      提交
    </el-button>
  </div>

  <JDialog
    :title='title'
    :visible='dialogVisible'
    @operate='handleOperate'
  >
    <JForm
      ref='JFormRef'
      :schema='schema'
      :defaultFormData='{type}'
    />
  </JDialog>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import MDEditor from '@/components/MDEditor/MDEditor.vue'
import JDialog from '@/components/JDialog/JDialog.vue'
import JForm from '@/components/JForm/JForm.vue'
import { editBlog } from '@/service/api/blog'
import { schema } from './config'
import { IJFrom } from '@/components/JForm/type'
import { OperateType } from '@/components/JDialog/type'
import { IEditBlogParams } from '@/service/api/blog/type'
import useBlogItem from '@/hooks/useBlogItem'

const { id, title, content, type } = useBlogItem('edit')

const JFormRef = ref<IJFrom>()
const dialogVisible = ref(false)

const submit = () => {
  if (!title.value) return ElMessage({
    type: 'error',
    message: 'Title Cannot be Empty'
  })
  if (!content.value) return ElMessage({
    type: 'error',
    message: 'Context Cannot be Empty'
  })
  dialogVisible.value = true
}

const handleOperate = async (type: OperateType) => {
  if (type === 'cancel') return dialogVisible.value = false
  if (!await JFormRef.value?.validate()) return
  try {
    const params = {
      id: id.value,
      title: title.value,
      content: content.value,
      ...JFormRef.value!.getFormData()
    }
    console.log(params)
    await editBlog(params as IEditBlogParams)
    ElMessage({
      type: 'success',
      message: 'Update Success'
    })
  } catch (error) {
    ElMessage({
      type: 'error',
      message: (error as Error).message
    })
  } finally {
    dialogVisible.value = false
  }
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

:deep(.el-switch) {
  --el-switch-on-color: darkcyan !important;
}
</style>
