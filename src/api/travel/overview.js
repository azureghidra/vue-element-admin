import request from '@/utils/request'

export function list(queryParams) {
  return request({
    url: '/travel/page',
    method: 'get',
    params: queryParams
  })
}

export function detail(id) {
  return request({
    url: '/travel/' + id,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/travel/',
    method: 'post',
    data: data
  })
}

export function update(id, data) {
  return request({
    url: '/travel/' + id,
    method: 'put',
    data: data
  })
}
