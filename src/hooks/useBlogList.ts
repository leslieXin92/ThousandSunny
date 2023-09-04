import { ref, shallowRef, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/useUserStore'
import { getBlogList } from '@/service/api/blog'
import { ElMessage } from 'element-plus'
import { debounce } from 'lodash'
import dayjs from 'dayjs'
import { IBlogItem, IGetBlogListParams } from '@/service/api/blog/type'

const useBlogList = () => {
  const userStore = useUserStore()
  const { isLogin } = storeToRefs(userStore)

  const params = ref<IGetBlogListParams>({
    type: isLogin.value ? 'private' : 'public',
    page: 1
  })
  const blogList = ref<Omit<IBlogItem, 'content'>[]>([])
  const totalCount = shallowRef<number>()
  const isFetching = ref(false)

  const load = async () => {
    if (isFetching.value) return
    if (blogList.value.length === totalCount.value) return hasLoadAll()
    isFetching.value = true
    try {
      const { data: { blogList: list, totalCount: total } } = await getBlogList(params.value)
      const processedBlogList = list.map((blog, index) => ({
        ...blog,
        showYear: dayjs(list[index - 1]?.createAt).year() !== dayjs(blog.createAt).year()
      }))
      totalCount.value = total
      blogList.value.push(...processedBlogList)
      params.value.page++
    } catch (e) {
      ElMessage.error((e as Error).message)
    } finally {
      isFetching.value = false
    }
  }

  const hasLoadAll = () => {
    ElMessage.success('that\'s all')
    window.removeEventListener('scroll', loadOnReachBottom)
  }

  const loadOnReachBottom = debounce(async () => {
    if (isFetching.value) return
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const clientHeight = document.documentElement.clientHeight
    const scrollHeight = document.documentElement.scrollHeight
    if (scrollHeight - scrollTop - clientHeight <= 800) await load()
  }, 200)

  const route = useRoute()

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
