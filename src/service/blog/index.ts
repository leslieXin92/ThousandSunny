import http from '@/service/axios/http'
import type { Res } from '@/service/axios/type'
import type {
  BlogItem,
  GetBlogListParams,
  GetBlogListRes,
  CreateBlogParams,
  UpdateBlogParams
} from '@/service/blog/type'

export function getBlogList(params: GetBlogListParams) {
  return http.get<Res<GetBlogListRes>>({
    url: '/blog',
    params,
    showSuccessMsg: false,
    showErrorMsg: true
  })
}

export function getBlogItem(blogId: number) {
  return http.get<Res<BlogItem>>({
    url: `/blog/${blogId}`,
    showSuccessMsg: false,
    showErrorMsg: true
  })
}

export function createBlog(data: CreateBlogParams) {
  return http.post<Res>({
    url: '/blog',
    data,
    showSuccessMsg: true,
    showErrorMsg: true
  })
}

export function updateBlog(data: UpdateBlogParams) {
  return http.patch<Res>({
    url: `/blog/${data.id}`,
    data,
    showSuccessMsg: true,
    showErrorMsg: true
  })
}

export function deleteBlog(blogId: number) {
  return http.delete<Res>({
    url: `/blog/${blogId}`,
    showSuccessMsg: true,
    showErrorMsg: true
  })
}
