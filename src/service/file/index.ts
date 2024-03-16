import http from '@/service/axios/http'
import type { Res } from '@/service/axios/type'
import type { UploadImage } from './type'

export function uploadImages(data: FormData) {
  return http.post<Res<UploadImage>>({
    url: '/file/image',
    data
  })
}
