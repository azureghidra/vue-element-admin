import request from '@/utils/request'

export function getMenus() {
  return request({
    url: '/sys/cfg/am',
    method: 'get'
  })
}
