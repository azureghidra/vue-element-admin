import request from '@/utils/request'

export function getDictItemPageList(queryParams) {
  return request({
    url: '/sys/dict-items/page',
    method: 'get',
    params: queryParams
  })
}

export function listDictItemByCode(dictCode) {
  return request({
    url: '/dict-items',
    method: 'get',
    params: { 'dictCode': dictCode, queryMode: 'list' }
  })
}

export function detail(id) {
  return request({
    url: '/sys/dict-items/' + id,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/dict-items',
    method: 'post',
    data: data
  })
}

export function update(id, data) {
  return request({
    url: '/sys/dict-items/' + id,
    method: 'put',
    data: data
  })
}

export function del(ids) {
  return request({
    url: '/sys/dict-items/' + ids,
    method: 'delete'
  })
}

export function patch(id, data) {
  return request({
    url: '/sys/dict-items/' + id,
    method: 'patch',
    data: data
  })
}
