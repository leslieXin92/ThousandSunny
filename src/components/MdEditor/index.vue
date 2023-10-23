<template>
  <template v-if="type==='edit'">
    <MdEditor
      class='editor'
      :modelValue='value'
      placeholder='blog content'
      :theme='theme'
      codeTheme='github'
      showCodeRowNumber
      :toolbars='toolbars'
      :footers='footers'
      @onUploadImg='uploadImage'
    />
  </template>

  <template v-else-if="type==='readonly'">
    <MdPreview
      class='editor'
      :theme='theme'
      codeTheme='github'
      showCodeRowNumber
      :modelValue='value'
    />
  </template>
</template>

<script lang='ts' setup>
import { computed } from 'vue'
import { MdEditor, MdPreview } from 'md-editor-v3'
import { useDark } from '@vueuse/core'
import { uploadImages } from '@/service/file'
import { toolbars, footers } from './config'
import 'md-editor-v3/lib/style.css'
import type { Res } from '@/service/axios/type'
import type { UploadImage } from '@/service/file/type'

interface Props {
  type: 'readonly' | 'edit'
  value?: string
}

withDefaults(defineProps<Props>(), {
  value: ''
})

const isDark = useDark()

const theme = computed(() => {
  return isDark.value ? 'dark' : 'light'
})

const uploadImage = async (files: File[], callback: (urls: string[]) => void) => {
  const dataList = await Promise.all(
    files.map((file) => {
      return new Promise<Res<UploadImage>>((resolve, reject) => {
        const formData = new FormData()
        formData.append('image', file)
        uploadImages(formData)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    })
  )
  callback(dataList.map((item) => item.data.imageUrl))
}
</script>

<style lang='scss' scoped>
.editor {
  letter-spacing: 1px;
}
</style>
