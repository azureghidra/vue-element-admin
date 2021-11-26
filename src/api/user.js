import request from '@/utils/request'

export function captcha() {
  return request({
    url: '/auth/captcha',
    method: 'get'
  })
}

export function login(data) {
  return request({
    url: '/auth/token',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/sys/user/me',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}
