import request from '@/utils/request'

export function getDictPageList(queryParams) {
  return request({
    url: '/sys/dicts/page',
    method: 'get',
    params: queryParams
  })
}

export function detail(id) {
  return request({
    url: '/sys/dicts/' + id,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/dicts',
    method: 'post',
    data: data
  })
}

export function update(id, data) {
  return request({
    url: '/sys/dicts/' + id,
    method: 'put',
    data: data
  })
}

export function del(ids) {
  return request({
    url: '/sys/dicts/' + ids,
    method: 'delete'
  })
}

export function patch(id, data) {
  return request({
    url: '/sys/dicts/' + id,
    method: 'patch',
    data: data
  })
}
