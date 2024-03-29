import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getBlogItem } from '@/service/blog'

const useBlogItem = (type: 'create' | 'show' | 'update') => {
  const route = useRoute()

  const title = ref('')
  const content = ref('')
  const formData = ref({
    visibility: 'public'
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
        formData.value.visibility = data.visibility
        content.value = data.content
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
