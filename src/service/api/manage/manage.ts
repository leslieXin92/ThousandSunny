import JRequest from '@/service'
import {
  IData,
  ILoginParams,
  ILoginRes,
  ILogoutParams,
  ILogoutRes,
  ICreateBlogParams,
  ICreateBlogRes,
  IEditBlogParams,
  IEditBlogRes,
  IDeleteBlogRes
} from './type'

// 登录
export function login(userInfo: ILoginParams) {
  return JRequest.post<IData<ILoginRes>>({
    url: '/login',
    data: userInfo,
    showLoading: true
  })
}

export function logout(userInfo: ILogoutParams) {
  return JRequest.post<IData<ILogoutRes>>({
    url: '/logout',
    data: userInfo,
    showLoading: true
  })
}

// 新增博客
export function createBlog(blogInfo: ICreateBlogParams) {
  return JRequest.post<IData<ICreateBlogRes>>({
    url: '/blog',
    data: blogInfo,
    showLoading: true
  })
}

// 编辑博客
export function editBlog(blogInfo: IEditBlogParams) {
  return JRequest.put<IData<IEditBlogRes>>({
    url: '/blog',
    data: blogInfo
  })
}

// 删除博客
export function deleteBlog(blogId: number) {
  return JRequest.delete<IData<IDeleteBlogRes>>({
    url: `/blog/${blogId}`
  })
}
