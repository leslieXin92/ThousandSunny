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
      @onUploadImg='onUploadImg'
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
import 'md-editor-v3/lib/style.css'
import { toolbars, footers } from './config'
import { updateImages } from '@/service/file'

interface Props {
  type: 'readonly' | 'edit'
  value?: string
}

withDefaults(defineProps<Props>(), {
  value: ''
})

const onUploadImg = async (files: Array<File>, callback: (urls: Array<string>) => void) => {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        const form = new FormData()
        form.append('file', file)
        updateImages(form)
          .then((res) => rev(res))
          .catch((error) => rej(error))
      })
    })
  )

  callback(res.map((item) => item.data))
}

const isDark = useDark()

const theme = computed(() => {
  return isDark.value ? 'dark' : 'light'
})
</script>

<style lang='scss' scoped>
.editor {
  letter-spacing: 1px;
}
</style>
