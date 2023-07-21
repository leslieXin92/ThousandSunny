import { onMounted, ref, Ref, shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getBlogList } from '@/service/api/blog'
import { IGetBlogListParams, IBlogItem } from '@/service/api/blog/type'
import { ElMessage } from 'element-plus'
import { debounce } from 'lodash'
import dayjs from 'dayjs'

interface IProps {
  params: Ref<IGetBlogListParams>
  originList: Ref<Omit<IBlogItem, 'content'>[]>
}

const useLoadBlog = (props: IProps) => {
  const { params, originList } = props

  const route = useRoute()

  const isFetching = ref(false)
  const totalCount = shallowRef<number>()

  const load = async () => {
    if (isFetching.value) return
    if (originList.value.length === totalCount.value) return hasLoadAll()
    isFetching.value = true
    try {
      const { data: { blogList, total } } = await getBlogList(params.value)
      const processedBlogList = blogList.map((blog, index) => ({
        ...blog,
        showYear: dayjs(blogList[index - 1]?.createAt).year() !== dayjs(blog.createAt).year()
      }))
      totalCount.value = total
      originList.value.push(...processedBlogList)
      params.value.pageNum++
    } catch (e) {
      ElMessage({
        type: 'error',
        message: (e as Error).message
      })
    } finally {
      isFetching.value = false
    }
  }

  const hasLoadAll = () => {
    ElMessage({
      type: 'success',
      message: 'that\'s all'
    })
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
      if (path.includes('/blog'))
        window.addEventListener('scroll', loadOnReachBottom)
      else
        window.removeEventListener('scroll', loadOnReachBottom)
    },
    { immediate: true }
  )

  onMounted(async () => {
    await load()
  })
}

export default useLoadBlog
