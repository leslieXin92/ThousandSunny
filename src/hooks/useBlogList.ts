import { ref, shallowRef, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { debounce } from 'lodash'
import dayjs from 'dayjs'
import { getBlogList } from '@/service/blog'
import usePermission from '@/hooks/usePermission'
import message from '@/utils/message'
import type { GetBlogListParams, BlogItem } from '@/service/blog/type'

const useBlogList = () => {
  const route = useRoute()

  const auth = usePermission('normal')
  const params = ref<GetBlogListParams>({
    visibility: auth ? '' : 'public',
    page: 1
  })
  const blogList = ref<(Omit<BlogItem, 'content'> & { showYear: boolean })[]>([])
  const totalCount = shallowRef<number>()
  const isFetching = ref(false)

  const load = async () => {
    if (isFetching.value) return
    if (blogList.value.length === totalCount.value) return hasLoadAll()
    isFetching.value = true
    const { data } = await getBlogList(params.value)
    blogList.value = [...blogList.value, ...data.blogList].map((blog, index, array) => ({
      ...blog,
      showYear: !index || dayjs(array[index - 1]?.createdAt).year() !== dayjs(blog.createdAt).year()
    }))
    totalCount.value = data.totalCount
    params.value.page++
    isFetching.value = false
  }

  const hasLoadAll = () => {
    message.success('That\'s All')
    window.removeEventListener('scroll', loadOnReachBottom)
  }

  const loadOnReachBottom = debounce(async () => {
    if (isFetching.value) return
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const clientHeight = document.documentElement.clientHeight
    const scrollHeight = document.documentElement.scrollHeight
    if (scrollHeight - scrollTop - clientHeight <= 800) await load()
  }, 200)

  watch(
    () => route.path,
    path => {
      if (path === '/blog')
        window.addEventListener('scroll', loadOnReachBottom)
      else
        window.removeEventListener('scroll', loadOnReachBottom)
    },
    { immediate: true }
  )

  onMounted(async () => {
    await load()
  })

  return {
    blogList,
    params,
    isFetching,
    totalCount
  }
}

export default useBlogList
