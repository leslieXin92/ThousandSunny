import { onMounted, onUnmounted, Ref, watch } from 'vue'
import { getBlogList } from '@/service/api/portal/portal'
import { IGetBlogListParams, IBlogItem } from '@/service/api/portal/type'

interface IProps {
  params: Ref<IGetBlogListParams>
  originData: Ref<Omit<IBlogItem, 'content'>[]>
}

const useLoadBlogList = (props: IProps) => {
  const { params, originData } = props

  const list: Omit<IBlogItem, 'content'>[] = [
    { id: 0, title: '浅谈node之koa', createAt: 1672531200000 },
    { id: 1, title: '浅谈node之koa', createAt: 1672531200000 },
    { id: 2, title: '浅谈node之koa', createAt: 1672531200000 },
    { id: 3, title: '浅谈node之koa', createAt: 1640995200000 },
    { id: 4, title: '浅谈node之koa', createAt: 1640995200000 },
    { id: 5, title: '浅谈node之koa', createAt: 1640995200000 },
    { id: 6, title: '浅谈node之koa', createAt: 1640995200000 },
    { id: 7, title: '浅谈node之koa', createAt: 1640995200000 },
    { id: 8, title: '浅谈node之koa', createAt: 1640995200000 },
    { id: 9, title: '浅谈node之koa', createAt: 1640995200000 },
    { id: 10, title: '浅谈node之koa', createAt: 1640995200000 },
    { id: 11, title: '浅谈node之koa', createAt: 1640995200000 },
    { id: 12, title: '浅谈node之koa', createAt: 1640995200000 },
    { id: 13, title: '浅谈node之koa', createAt: 1640995200000 },
    { id: 14, title: '浅谈node之koa', createAt: 1640995200000 },
    { id: 15, title: '浅谈node之koa', createAt: 1640995200000 },
    { id: 16, title: '浅谈node之koa', createAt: 1609430400000 },
    { id: 17, title: '浅谈node之koa', createAt: 1609430400000 },
    { id: 18, title: '浅谈node之koa', createAt: 1609430400000 },
    { id: 19, title: '浅谈node之koa', createAt: 1609430400000 }
  ]

  const loadMore = async () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const clientHeight = document.documentElement.clientHeight
    const scrollHeight = document.documentElement.scrollHeight
    if (scrollTop + clientHeight >= scrollHeight) {
      /*
        const { data: { blogList } } = await getBlogList(params.value)
        originData.value.push(...blogList)
      */
      const newList = list.reduce((pre: Omit<IBlogItem, 'content'>[], cur) => {
        const preYear = new Date(pre[pre.length - 1]?.createAt).getFullYear()
        const curYear = new Date(cur.createAt).getFullYear()
        if (curYear !== preYear) {
          cur.showYear = true
          cur.newYear = curYear
        }
        return pre.concat([cur])
      }, [])
      originData.value.push(...newList)
      params.value.pageNum++
    }
  }

  // TODO - remove
  watch(
    originData,
    (newValue) => {
      console.log(newValue)
    },
    { deep: true }
  )

  onMounted(async () => {
    await loadMore()
    window.addEventListener('scroll', loadMore)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', loadMore)
  })
}

export default useLoadBlogList
