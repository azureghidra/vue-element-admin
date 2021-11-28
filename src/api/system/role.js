import request from '@/utils/request'

export function getRolePageList(queryParams) {
  return request({
    url: '/sys/role/page',
    method: 'get',
    params: queryParams
  })
}

export function getRoleList() {
  return request({
    url: '/sys/role',
    method: 'get'
  })
}

export function detail(id) {
  return request({
    url: '/sys/role/' + id,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data: data
  })
}

export function update(id, data) {
  return request({
    url: '/sys/role/' + id,
    method: 'put',
    data: data
  })
}

export function del(ids) {
  return request({
    url: '/sys/role/' + ids,
    method: 'delete'
  })
}

export function patch(id, data) {
  return request({
    url: '/sys/role/' + id,
    method: 'patch',
    data: data
  })
}

export function listRoleMenu(id) {
  return request({
    url: '/sys/role/' + id + '/menus',
    method: 'get'
  })
}

export function listRolePermission(id, params) {
  return request({
    url: '/sys/role/' + id + '/permissions',
    method: 'get',
    params: params
  })
}

export function updateRoleMenu(id, menuIds) {
  return request({
    url: '/sys/role/' + id + '/menus',
    method: 'put',
    data: { menuIds: menuIds }
  })
}

export function updateRolePermission(menuId, roleId, permissionIds) {
  return request({
    url: '/sys/role/' + roleId + '/permissions',
    method: 'put',
    data: { menuId: menuId, permissionIds: permissionIds }
  })
}
