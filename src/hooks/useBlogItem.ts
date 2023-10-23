import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getBlogItem } from '@/service/blog'

const useBlogItem = (type: 'show' | 'edit' | 'create') => {
  const route = useRoute()

  const title = ref('')
  const content = ref('')
  const formData = ref({
    type: 'public'
  })

  const loading = ref(false)

  const id = computed(() => {
    return Number(route.params.id)
  })

  watch(
    id,
    async (newId) => {
      if (type === 'create' || !newId) return
      loading.value = true
      try {
        const { data } = await getBlogItem(newId)
        title.value = data.title
        formData.value.type = data.type
        content.value = data.content
      } catch (e) {
        ElMessage.error((e as Error).message)
      } finally {
        loading.value = false
      }
    },
    { immediate: true }
  )

  return {
    id,
    title,
    content,
    formData,
    loading
  }
}

export default useBlogItem
