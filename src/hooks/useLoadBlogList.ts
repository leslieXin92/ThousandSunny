import { onMounted, onUnmounted, ref, Ref, shallowRef } from 'vue'
import { getBlogList } from '@/service/api/blog'
import { IGetBlogListParams, IBlogItem } from '@/service/api/blog/type'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'

interface IProps {
  params: Ref<IGetBlogListParams>
  originList: Ref<Omit<IBlogItem, 'content'>[]>
}

const useLoadBlogList = (props: IProps) => {
  const { params, originList } = props

  const isFetching = ref(false)
  const totalCount = shallowRef<number>()

  const load = async () => {
    if (isFetching.value) return
    isFetching.value = true
    if (originList.value.length === totalCount.value) {
      ElMessage({
        type: 'warning',
        message: '已经到底了'
      })
      window.removeEventListener('scroll', loadOnReachBottom)
      return
    }
    try {
      const { data: { blogList, total } } = await getBlogList(params.value)
      totalCount.value = total
      const processedBlogList = blogList.map((blog, index) => {
        const preYear = dayjs(blogList[index - 1]?.createAt).year()
        const curYear = dayjs(blog.createAt).year()
        if (curYear !== preYear) {
          blog.showYear = true
          blog.newYear = curYear
        }
        return blog
      })
      originList.value.concat(processedBlogList)
      params.value.pageNum++
    } catch (e: any) { // TODO - any
      ElMessage({
        type: 'error',
        message: e.message
      })
    } finally {
      isFetching.value = false
    }
  }

  const loadOnReachBottom = async () => {
    if (isFetching.value) return
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const clientHeight = document.documentElement.clientHeight
    const scrollHeight = document.documentElement.scrollHeight
    if (scrollTop + clientHeight >= scrollHeight) await load()
  }

  onMounted(async () => {
    await load()
    window.addEventListener('scroll', loadOnReachBottom)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', loadOnReachBottom)
  })
}

export default useLoadBlogList
