import request from '@/utils/request'

export function getRolePageList(queryParams) {
  return request({
    url: '/sys/roles/page',
    method: 'get',
    params: queryParams
  })
}

export function getRoleList() {
  return request({
    url: '/roles',
    method: 'get'
  })
}

export function detail(id) {
  return request({
    url: '/sys/roles/' + id,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/roles',
    method: 'post',
    data: data
  })
}

export function update(id, data) {
  return request({
    url: '/sys/roles/' + id,
    method: 'put',
    data: data
  })
}

export function del(ids) {
  return request({
    url: '/sys/roles/' + ids,
    method: 'delete'
  })
}

export function patch(id, data) {
  return request({
    url: '/sys/roles/' + id,
    method: 'patch',
    data: data
  })
}

export function listRoleMenu(id) {
  return request({
    url: '/sys/roles/' + id + '/menus',
    method: 'get'
  })
}

export function listRolePermission(id, params) {
  return request({
    url: '/sys/roles/' + id + '/permissions',
    method: 'get',
    params: params
  })
}

export function updateRoleMenu(id, menuIds) {
  return request({
    url: '/sys/roles/' + id + '/menus',
    method: 'put',
    data: { menuIds: menuIds }
  })
}

export function updateRolePermission(menuId, roleId, permissionIds) {
  return request({
    url: '/sys/roles/' + roleId + '/permissions',
    method: 'put',
    data: { menuId: menuId, permissionIds: permissionIds }
  })
}
