<template>
  <ElUpload
    class="uploader"
    action="/api/file/image"
    name="image"
    :headers="{ authorization: `Bearer ${token}` }"
    :showFileList="false"
    :onSuccess="handleSuccess"
    :onError="handleError"
  >
    <img v-show="imageUrl" :src="imageUrl" alt="" />
    <img v-show='!imageUrl' src="../../../assets/add_image.gif" alt="" />
  </ElUpload>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/useUserStore'
import message from '@/utils/message'
import type { UploadProps } from 'element-plus'
import type { Res } from '@/service/axios/type'

interface Props {
  imageUrl?: string
}

interface Emits {
  (e: 'onChange', blob: string): void
}

const props = withDefaults(defineProps<Props>(), {
  imageUrl: ''
})

const emits = defineEmits<Emits>()

const userStore = useUserStore()
const { token } = storeToRefs(userStore)

const imageUrl = ref(props.imageUrl)

watch(imageUrl, (newUrl) => {
  emits('onChange', newUrl)
}, { immediate: true })

const handleSuccess: UploadProps['onSuccess'] = ({ data }) => {
  imageUrl.value = data.imageUrl
}

const handleError = (err: Error) => {
  const errorData: Res<Record<string, any>> = JSON.parse(err.message)
  message.error(errorData.msg)
}
</script>

<style scoped lang='scss'>
.uploader {
  img {
    width: 80px;
    height: 80px;
  }
}
</style>
