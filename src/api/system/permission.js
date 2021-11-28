import request from '@/utils/request'

export function getPermissionPageList(queryParams) {
  return request({
    url: '/sys/permission/page',
    method: 'get',
    params: queryParams
  })
}

export function getPermissionList(queryParams) {
  return request({
    url: '/sys/permission',
    method: 'get',
    params: queryParams
  })
}

export function detail(id) {
  return request({
    url: '/sys/permission/' + id,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data: data
  })
}

export function update(id, data) {
  return request({
    url: '/sys/permission/' + id,
    method: 'put',
    data: data
  })
}

export function del(ids) {
  return request({
    url: '/sys/permission/' + ids,
    method: 'delete'
  })
}

export function patch(id, data) {
  return request({
    url: '/sys/permission/' + id,
    method: 'patch',
    data: data
  })
}
