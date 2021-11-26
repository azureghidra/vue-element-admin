import request from '@/utils/request'

export function getMenuTableList(queryParams) {
  return request({
    url: '/menus/table',
    method: 'get',
    params: queryParams
  })
}

export function getMenuSelectList() {
  return request({
    url: '/menus/select',
    method: 'get'
  })
}

export function getMenuTreeSelectList() {
  return request({
    url: '/menus/tree-select',
    method: 'get'
  })
}

export function getMenuRouteList() {
  return request({
    url: '/menus/route',
    method: 'get'
  })
}

export function detail(id) {
  return request({
    url: '/menus/' + id,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/menus',
    method: 'post',
    data: data
  })
}

export function update(id, data) {
  return request({
    url: '/sys/menus/' + id,
    method: 'put',
    data: data
  })
}

export function del(ids) {
  return request({
    url: '/sys/menus/' + ids,
    method: 'delete'
  })
}

export function patch(id, data) {
  return request({
    url: '/sys/menus/' + id,
    method: 'patch',
    data: data
  })
}
