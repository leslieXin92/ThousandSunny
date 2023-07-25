<template>
  <MavonEditor
    ref='mavonEditorRef'
    v-model='context'
    @imgAdd='imgAdd'
  />
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { uploadImage } from '@/service/api/upload'

export default defineComponent({
  name: 'MDEditor',
  components: {
    MavonEditor: mavonEditor.mavonEditor
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      context: ''
    }
  },
  watch: {
    value(newValue) {
      this.context = newValue
    }
  },
  methods: {
    async imgAdd(position: number, file: any) {
      // 第一步: 将图片上传到服务器
      const formData = new FormData()
      formData.append('image', file)
      const { data } = await uploadImage(formData);
      // 第二步: 将返回的url替换到文本原位置
      (this.$refs.mavonEditorRef as any).$img2Url(position, data.url)
    }
  }
})
</script>

<style scoped lang='less'>
:deep(textarea) {
  background-color: #fff !important;
}
</style>
