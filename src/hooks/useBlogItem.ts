import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getBlogDetail } from '@/service/api/blog'
import { useMarkdown2HTML } from '@/hooks/useMarkdown2HTML'
import { mockQueryBlogItem } from '@/views/Blog/Detail/mock'

const useBlogItem = (type: 'show' | 'edit') => {
  const route = useRoute()

  const title = ref('')
  const content = ref('')

  const id = computed(() => {
    return Number(route.params.id)
  })

  watch(
    id,
    async (newId) => {
      if (!newId) return
      // const { data } = await getBlogDetail(newId)
      // title.value = data.title
      // content.value = type === 'show' ? useMarkdown2HTML(data.content) : data.content
      const blogItem = await mockQueryBlogItem(newId)
      title.value = blogItem.title
      content.value = type === 'show' ? useMarkdown2HTML(blogItem.content) : blogItem.content
    },
    { immediate: true }
  )

  return {
    title,
    content
  }
}

export default useBlogItem
