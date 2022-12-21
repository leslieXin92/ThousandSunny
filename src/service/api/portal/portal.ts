import JRequest from '@/service'
import { IData, IGetBlogListParams, IGetBlogListRes, BlogItem } from './type'

// 获取博客列表
export function getBlogList(data: IGetBlogListParams) {
  return JRequest.get<IData<IGetBlogListRes>>({
    url: '/blogList',
    params: data,
    showLoading: true
  })
}

// 获取博客详情
export function getBlogDetail(blogId: number) {
  return JRequest.get<IData<BlogItem>>({
    url: `/blog/${ blogId }`,
    showLoading: true
  })
}
