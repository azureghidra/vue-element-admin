import request from '@/utils/request'

export function viewPdf(id) {
  return request({
    url: '/travel/preview/' + id,
    method: 'get'
  })
}
