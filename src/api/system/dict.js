import request from '@/utils/request'

export function getDictPageList(queryParams) {
  return request({
    url: '/sys/dict/page',
    method: 'get',
    params: queryParams
  })
}

export function items(name) {
  return request({
    url: '/sys/dict/' + name + '/items',
    method: 'get'
  })
}

export function detail(id) {
  return request({
    url: '/sys/dict/' + id,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/sys/dict',
    method: 'post',
    data: data
  })
}

export function update(id, data) {
  return request({
    url: '/sys/dict/' + id,
    method: 'put',
    data: data
  })
}

export function del(ids) {
  return request({
    url: '/sys/dict/' + ids,
    method: 'delete'
  })
}

export function patch(id, data) {
  return request({
    url: '/sys/dict/' + id,
    method: 'patch',
    data: data
  })
}
