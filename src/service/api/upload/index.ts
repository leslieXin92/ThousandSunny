import JRequest from '@/service'
import { IData, IUploadImageRes } from './type'

// 上传图片
export function uploadImage(formData: FormData) {
  return JRequest.post<IData<IUploadImageRes>>({
    url: '/upload/image',
    data: formData
  })
}
