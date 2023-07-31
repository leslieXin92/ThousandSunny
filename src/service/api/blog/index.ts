import JRequest from '@/service'
import { IData } from '@/service/api/type'
import {
  ICreateBlogParams,
  IEditBlogParams,
  IGetBlogListParams,
  IGetBlogListRes,
  IBlogItem
} from './type'

// 新增博客
export function createBlog(blogInfo: ICreateBlogParams) {
  return JRequest.post<IData<{}>>({
    url: '/blog',
    data: blogInfo,
    showLoading: true
  })
}

// 删除博客
export function deleteBlog(blogId: number) {
  return JRequest.delete<IData>({
    url: `/blog/${blogId}`
  })
}

// 编辑博客
export function editBlog(blogInfo: IEditBlogParams) {
  return JRequest.put<IData>({
    url: '/blog',
    data: blogInfo
  })
}

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
  return JRequest.get<IData<IBlogItem>>({
    url: `/blog/${blogId}`,
    showLoading: true
  })
}
