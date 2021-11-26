import request from '@/utils/request'

export function getPermissionPageList(queryParams) {
  return request({
    url: '/sys/permissions/page',
    method: 'get',
    params: queryParams
  })
}

export function getPermissionList(queryParams) {
  return request({
    url: '/sys/permissions',
    method: 'get',
    params: queryParams
  })
}

export function detail(id) {
  return request({
    url: '/sys/permissions/' + id,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/sys/permissions',
    method: 'post',
    data: data
  })
}

export function update(id, data) {
  return request({
    url: '/permissions/' + id,
    method: 'put',
    data: data
  })
}

export function del(ids) {
  return request({
    url: '/permissions/' + ids,
    method: 'delete'
  })
}

export function patch(id, data) {
  return request({
    url: '/permissions/' + id,
    method: 'patch',
    data: data
  })
}
