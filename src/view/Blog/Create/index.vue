<template>
  <div class='createBlogPage'>
    <div class='header'>
      <el-input
        v-model='title'
        size='large'
        placeholder='blog title'
      />

      <el-button
        type='primary'
        @click='submit'
      >
        提交
      </el-button>
    </div>

    <MdEditor
      class='mdEditor'
      type='edit'
      v-model='content'
    />

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
import { createBlog } from '@/service/blog'
import useBlogItem from '@/hooks/useBlogItem'
import message from '@/utils/message'
import { schema } from '../config'
import type { OperateType } from '@/libComponents/JDialog/type'
import type { JFormRef } from '@/libComponents/JForm/type'
import type { CreateBlogParams } from '@/service/blog/type'

const router = useRouter()

const { title, content, formData } = useBlogItem('create')

const JFormRef = ref<JFormRef>()
const dialogVisible = ref(false)

const submit = () => {
  if (!title.value) return message.error('Title Cannot be Empty')
  if (!content.value) return message.error('Content Cannot be Empty')
  dialogVisible.value = true
}

const handleOperate = async (type: OperateType) => {
  if (type === 'cancel') return dialogVisible.value = false
  if (!await JFormRef.value?.validate()) return
  const params = {
    title: title.value,
    content: content.value,
    ...JFormRef.value!.getFormData()
  }
  await createBlog(params as CreateBlogParams)
  dialogVisible.value = false
  await router.replace('/blog')
}
</script>

<style lang='scss' scoped>
.createBlogPage {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: calc(100vh - 196px);

  .header {
    display: flex;
    width: 100%;
    margin-bottom: 10px;
    padding-right: 20px;

    :deep(.el-input) {
      flex: 1;
    }

    :deep(.el-input__wrapper) {
      box-shadow: none;
    }

    :deep(.el-input__inner) {
      font-size: 24px;
      font-weight: bold;
      color: darkcyan;
    }
  }

  .mdEditor {
    flex: 1;
  }
}
</style>
