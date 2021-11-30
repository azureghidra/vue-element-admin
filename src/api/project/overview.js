import request from '@/utils/request'

export function list(queryParams) {
  return request({
    url: '/proj/overview/page',
    method: 'get',
    params: queryParams
  })
}

export function detail(id) {
  return request({
    url: '/proj/overview/' + id,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/proj/overview/',
    method: 'post',
    data: data
  })
}

export function update(id, data) {
  return request({
    url: '/proj/overview/' + id,
    method: 'put',
    data: data
  })
}
