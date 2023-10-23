import { ref, shallowRef, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { cloneDeep, debounce } from 'lodash'
import dayjs from 'dayjs'
import { useUserStore } from '@/store/useUserStore'
import { getBlogList } from '@/service/blog'
import message from '@/utils/message'
import type { GetBlogListParams } from '@/service/blog/type'

const useBlogList = () => {
  const route = useRoute()

  const userStore = useUserStore()
  const { isLogin } = storeToRefs(userStore)

  const params = ref<GetBlogListParams>({
    type: isLogin.value ? '' : 'public',
    page: 1
  })
  const blogList = ref<Omit<any, 'content'>[]>([])
  const totalCount = shallowRef<number>()
  const isFetching = ref(false)

  const load = async () => {
    if (isFetching.value) return
    if (blogList.value.length === totalCount.value) return hasLoadAll()
    isFetching.value = true
    const { data } = await getBlogList(params.value)
    const temp = cloneDeep(blogList.value).concat(data.blogList)
    blogList.value = temp.map((blog, index) => ({
      ...blog,
      showYear: !index || dayjs(temp[index - 1]?.createdAt).year() !== dayjs(blog.createdAt).year()
    }))
    totalCount.value = data.totalCount
    params.value.page++
    isFetching.value = false
  }

  const hasLoadAll = () => {
    message.success('that\'s all')
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
