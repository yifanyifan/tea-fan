import request from '@/utils/request'

// 获取管理员列表
export const getManagerList = (params) => {
  return request({
    url: '/manager/list',
    method: 'get',
    params
  })
}

// 添加管理员
export const addManager = (data) => {
  return request({
    url: '/manager/add',
    method: 'post',
    data
  })
}

// 更新管理员
export const updateManager = (data) => {
  return request({
    url: '/manager/update',
    method: 'put',
    data
  })
}

// 删除管理员
export const deleteManager = (id) => {
  return request({
    url: `/manager/delete/${id}`,
    method: 'delete'
  })
}

// 角色相关接口
export const getRoleList = () => {
  return request({
    url: '/role/list',
    method: 'get'
  })
}

export const addRole = (data) => {
  return request({
    url: '/role/add',
    method: 'post',
    data
  })
}

export const updateRole = (data) => {
  return request({
    url: '/role/update',
    method: 'put',
    data
  })
}

export const deleteRole = (id) => {
  return request({
    url: `/role/delete/${id}`,
    method: 'delete'
  })
}

// 权限相关接口
export const getPermissionList = () => {
  return request({
    url: '/permission/list',
    method: 'get'
  })
}

export const getPermissionTree = () => {
  return request({
    url: '/permission/tree',
    method: 'get'
  })
}

export const addPermission = (data) => {
  return request({
    url: '/permission/add',
    method: 'post',
    data
  })
}

export const updatePermission = (data) => {
  return request({
    url: '/permission/update',
    method: 'put',
    data
  })
}

export const deletePermission = (id) => {
  return request({
    url: `/permission/delete/${id}`,
    method: 'delete'
  })
} 