import request from '@/utils/request'

export function getMenuTableList(queryParams) {
  return request({
    url: '/sys/menu/table',
    method: 'get',
    params: queryParams
  })
}

export function getMenuSelectList() {
  return request({
    url: '/sys/menu/select',
    method: 'get'
  })
}

export function getMenuTreeSelectList() {
  return request({
    url: '/sys/menu/tree-select',
    method: 'get'
  })
}

export function getMenuRouteList() {
  return request({
    url: '/sys/menu/route',
    method: 'get'
  })
}

export function detail(id) {
  return request({
    url: '/sys/menu/' + id,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/sys/menu/',
    method: 'post',
    data: data
  })
}

export function update(id, data) {
  return request({
    url: '/sys/menu/' + id,
    method: 'put',
    data: data
  })
}

export function del(ids) {
  return request({
    url: '/sys/menu/' + ids,
    method: 'delete'
  })
}

export function patch(id, data) {
  return request({
    url: '/sys/menu/' + id,
    method: 'patch',
    data: data
  })
}
