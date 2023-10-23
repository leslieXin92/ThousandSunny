<template>
  <div class='editBlogPage'>
    <el-input
      class='el-input--suffix'
      v-model='title'
      size='large'
      maxlength='15'
      placeholder='blog title'
    />

    <MdEditor
      class='mdEditor'
      type='edit'
      v-model='content'
    />

    <el-button
      type='primary'
      @click='submit'
    >
      提交
    </el-button>

    <JDialog
      :title='title'
      :visible='dialogVisible'
      @operate='handleOperate'
    >
      <JForm
        ref='JFormRef'
        :schema='schema'
        :defaultFormData='formData'
      />
    </JDialog>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import JDialog from '@/libComponents/JDialog/index.vue'
import JForm from '@/libComponents/JForm/index.vue'
import MdEditor from '@/components/MdEditor/index.vue'
import { updateBlog } from '@/service/blog'
import useBlogItem from '@/hooks/useBlogItem'
import message from '@/utils/message'
import { schema } from '../config'
import type { OperateType } from '@/libComponents/JDialog/type'
import type { JFormRef } from '@/libComponents/JForm/type'
import type { UpdateBlogParams } from '@/service/blog/type'

const router = useRouter()

const { id, title, content, formData } = useBlogItem('edit')

const JFormRef = ref<JFormRef>()
const dialogVisible = ref(false)

const submit = () => {
  if (!title.value) return message.error('Title Cannot be Empty!')
  if (!content.value) return message.error('Context Cannot be Empty')
  dialogVisible.value = true
}

const handleOperate = async (type: OperateType) => {
  if (type === 'cancel') return dialogVisible.value = false
  if (!await JFormRef.value?.validate()) return
  const params = {
    id: id.value,
    title: title.value,
    content: content.value,
    ...JFormRef.value!.getFormData()
  }
  await updateBlog(params as UpdateBlogParams)
  dialogVisible.value = false
  router.back()
}
</script>

<style lang='scss' scoped>
.editBlogPage {
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

  .mdEditor {
    flex: 1;
    width: 100%;
    margin: 20px 0;
  }

  .el-button {
    width: 250px;
    height: 50px;
    border-radius: 10px;
  }
}
</style>
