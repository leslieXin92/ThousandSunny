import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMarkdown2HTML } from '@/hooks/useMarkdown2HTML'
import { getBlogDetail } from '@/service/api/blog'
import { mockQueryBlogItem } from '@/views/Blog/Detail/mock'
import { ElMessage } from 'element-plus'

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
        // const { data } = await getBlogDetail(newId)
        // title.value = data.title
        //  formData.value.type = data.type
        // content.value = type === 'show' ? useMarkdown2HTML(data.content) : data.content
        const blogItem = await mockQueryBlogItem(newId)
        title.value = blogItem.title
        formData.value.type = blogItem.type
        content.value = type === 'show' ? useMarkdown2HTML(blogItem.content) : blogItem.content
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
