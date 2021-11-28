import request from '@/utils/request'

export function getDictItemPageList(queryParams) {
  return request({
    url: '/sys/dict-item/page',
    method: 'get',
    params: queryParams
  })
}

export function listDictItemByCode(dictCode) {
  return request({
    url: '/sys/dict-item',
    method: 'get',
    params: { 'dictCode': dictCode, queryMode: 'list' }
  })
}

export function detail(id) {
  return request({
    url: '/sys/dict-item/' + id,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/sys/dict-item',
    method: 'post',
    data: data
  })
}

export function update(id, data) {
  return request({
    url: '/sys/dict-item/' + id,
    method: 'put',
    data: data
  })
}

export function del(ids) {
  return request({
    url: '/sys/dict-item/' + ids,
    method: 'delete'
  })
}

export function patch(id, data) {
  return request({
    url: '/sys/dict-item/' + id,
    method: 'patch',
    data: data
  })
}
