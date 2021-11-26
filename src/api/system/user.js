import request from '@/utils/request'

export function list(queryParams) {
  return request({
    url: '/sys/user',
    method: 'get',
    params: queryParams
  })
}

export function detail(id) {
  return request({
    url: '/sys/user/' + id,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data: data
  })
}

export function update(id, data) {
  return request({
    url: '/sys/user/' + id,
    method: 'put',
    data: data
  })
}

export function patch(id, data) {
  return request({
    url: '/sys/user/' + id,
    method: 'patch',
    data: data
  })
}

export function del(ids) {
  return request({
    url: '/sys/user/' + ids,
    method: 'delete'
  })
}
