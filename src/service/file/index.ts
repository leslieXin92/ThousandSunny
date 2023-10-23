import http from '@/service/axios/http'

export function updateImages(formData: FormData) {
  return http.post({
    url: 'upload/image',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}
