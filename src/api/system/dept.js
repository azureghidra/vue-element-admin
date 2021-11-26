import request from '@/utils/request'

export function getDeptTableList(queryParams) {
  return request({
    url: '/sys/dept/table',
    method: 'get',
    params: queryParams
  })
}

export function getDeptSelectList() {
  return request({
    url: '/sys/dept/select',
    method: 'get'
  })
}

export function detail(id) {
  return request({
    url: '/sys/dept/' + id,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/sys/dept',
    method: 'post',
    data: data
  })
}

export function update(id, data) {
  return request({
    url: '/sys/dept/' + id,
    method: 'put',
    data: data
  })
}

export function del(ids) {
  return request({
    url: '/sys/dept/' + ids,
    method: 'delete'
  })
}

export function patch(id, data) {
  return request({
    url: '/sys/dept/' + id,
    method: 'patch',
    data: data
  })
}
