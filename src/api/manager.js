/**
 * 管理员相关API接口
 * @module manager
 */

import request from '@/utils/request'

/**
 * 管理员API接口
 */
export const managerApi = {
  /**
   * 获取管理员列表
   * @description 获取管理员列表，支持分页和条件查询
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.size - 每页数量
   * @param {string} [params.keyword] - 搜索关键词
   * @returns {Promise<Object>} 管理员列表数据
   */
  getList: (params) => request({
    url: '/manager/list',
    method: 'get',
    params
  }),

  /**
   * 添加管理员
   * @description 添加新的管理员账号
   * @param {Object} data - 管理员数据
   * @param {string} data.username - 用户名
   * @param {string} data.password - 密码
   * @param {string} data.nickname - 昵称
   * @param {string} data.email - 邮箱
   * @param {string} data.phone - 手机号
   * @param {Array} data.roles - 角色ID数组
   * @returns {Promise<Object>} 添加结果
   */
  add: (data) => request({
    url: '/manager/add',
    method: 'post',
    data
  }),

  /**
   * 更新管理员
   * @description 更新管理员信息
   * @param {Object} data - 更新数据
   * @param {number} data.id - 管理员ID
   * @param {string} [data.nickname] - 昵称
   * @param {string} [data.email] - 邮箱
   * @param {string} [data.phone] - 手机号
   * @param {Array} [data.roles] - 角色ID数组
   * @returns {Promise<Object>} 更新结果
   */
  update: (data) => request({
    url: '/manager/update',
    method: 'put',
    data
  }),

  /**
   * 删除管理员
   * @description 删除指定管理员
   * @param {number} id - 管理员ID
   * @returns {Promise<Object>} 删除结果
   */
  delete: (id) => request({
    url: `/manager/delete/${id}`,
    method: 'delete'
  })
}

/**
 * 角色API接口
 */
export const roleApi = {
  /**
   * 获取角色列表
   * @description 获取所有角色列表
   * @returns {Promise<Array>} 角色列表
   */
  getList: () => request({
    url: '/role/list',
    method: 'get'
  }),

  /**
   * 添加角色
   * @description 添加新的角色
   * @param {Object} data - 角色数据
   * @param {string} data.name - 角色名称
   * @param {string} data.description - 角色描述
   * @param {Array} data.permissions - 权限ID数组
   * @returns {Promise<Object>} 添加结果
   */
  add: (data) => request({
    url: '/role/add',
    method: 'post',
    data
  }),

  /**
   * 更新角色
   * @description 更新角色信息
   * @param {Object} data - 更新数据
   * @param {number} data.id - 角色ID
   * @param {string} [data.name] - 角色名称
   * @param {string} [data.description] - 角色描述
   * @param {Array} [data.permissions] - 权限ID数组
   * @returns {Promise<Object>} 更新结果
   */
  update: (data) => request({
    url: '/role/update',
    method: 'put',
    data
  }),

  /**
   * 删除角色
   * @description 删除指定角色
   * @param {number} id - 角色ID
   * @returns {Promise<Object>} 删除结果
   */
  delete: (id) => request({
    url: `/role/delete/${id}`,
    method: 'delete'
  })
}

/**
 * 权限API接口
 */
export const permissionApi = {
  /**
   * 获取权限列表
   * @description 获取所有权限列表
   * @returns {Promise<Array>} 权限列表
   */
  getList: () => request({
    url: '/permission/list',
    method: 'get'
  }),

  /**
   * 获取权限树
   * @description 获取权限的树形结构
   * @returns {Promise<Array>} 权限树
   */
  getTree: () => request({
    url: '/permission/tree',
    method: 'get'
  }),

  /**
   * 添加权限
   * @description 添加新的权限
   * @param {Object} data - 权限数据
   * @param {string} data.name - 权限名称
   * @param {string} data.code - 权限编码
   * @param {string} data.type - 权限类型
   * @param {number} [data.parentId] - 父级权限ID
   * @returns {Promise<Object>} 添加结果
   */
  add: (data) => request({
    url: '/permission/add',
    method: 'post',
    data
  }),

  /**
   * 更新权限
   * @description 更新权限信息
   * @param {Object} data - 更新数据
   * @param {number} data.id - 权限ID
   * @param {string} [data.name] - 权限名称
   * @param {string} [data.code] - 权限编码
   * @param {string} [data.type] - 权限类型
   * @returns {Promise<Object>} 更新结果
   */
  update: (data) => request({
    url: '/permission/update',
    method: 'put',
    data
  }),

  /**
   * 删除权限
   * @description 删除指定权限
   * @param {number} id - 权限ID
   * @returns {Promise<Object>} 删除结果
   */
  delete: (id) => request({
    url: `/permission/delete/${id}`,
    method: 'delete'
  })
}

// 导出所有API模块
export default {
  manager: managerApi,
  role: roleApi,
  permission: permissionApi
} 