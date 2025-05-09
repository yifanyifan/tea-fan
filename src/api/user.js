/**
 * 用户相关API接口
 * @module user
 */

import { request } from '@/utils/request'
import { requestOkx } from '@/utils/requestOkx'
import { requestBinance } from '@/utils/requestBinance'

/**
 * 认证相关接口
 */
export const authApi = {
  /**
   * 用户登录
   * @param {Object} params - 登录参数
   * @param {string} params.username - 用户名
   * @param {string} params.password - 密码
   * @returns {Promise<Object>} 登录结果
   */
  login: (params) => request({
    method: 'POST',
    url: '/sys/sso/login',
    data: params,
    headers: {
      'content-type': 'multipart/form-data'
    }
  }),

  /**
   * 获取用户信息
   * @returns {Promise<Object>} 用户信息
   */
  getUserInfo: () => request({
    method: 'GET',
    url: '/sys/sso/info'
  })
}

/**
 * 用户管理相关接口
 */
export const userApi = {
  /**
   * 获取用户列表（分页）
   * @param {Object} urlSearch - URL查询参数
   * @param {Object} data - 请求数据
   * @returns {Promise} 用户列表
   */
  getList: (urlSearch, data) => request({
    url: '/sys/user/queryPageByParam',
    method: 'POST',
    urlSearch,
    data,
    headers: {
      'content-type': 'application/json'
    }
  }),

  /**
   * 添加用户
   * @param {Object} params - 用户信息
   * @returns {Promise} 添加结果
   */
  add: (params) => request({
    url: '/sys/user/add',
    method: 'POST',
    data: params
  }),

  /**
   * 获取用户角色
   * @param {string} userId - 用户ID
   * @returns {Promise} 角色信息
   */
  getRoles: (userId) => request({
    url: `/sys/role/getRoleByUserId/id/${userId}`,
    method: 'GET'
  }),

  /**
   * 删除用户
   * @param {string} userId - 用户ID
   * @returns {Promise} 删除结果
   */
  delete: (userId) => request({
    url: `/sys/user/id/${userId}`,
    method: 'DELETE'
  }),

  /**
   * 更新用户状态
   * @param {Object} data - 更新数据
   * @returns {Promise} 更新结果
   */
  updateStatus: (data) => request({
    url: '/user/status',
    method: 'put',
    data
  })
}

/**
 * 角色管理相关接口
 */
export const roleApi = {
  /**
   * 获取角色列表（分页）
   * @param {Object} urlSearch - URL查询参数
   * @param {Object} data - 请求数据
   * @returns {Promise} 角色列表
   */
  getList: (urlSearch, data) => request({
    url: '/sys/role/queryPageByParam',
    method: 'POST',
    urlSearch,
    data,
    headers: {
      'content-type': 'application/json'
    }
  }),

  /**
   * 添加角色
   * @param {Object} params - 角色信息
   * @returns {Promise} 添加结果
   */
  add: (params) => request({
    url: '/sys/role/add',
    method: 'POST',
    data: params
  }),

  /**
   * 获取所有角色
   * @param {Object} params - 查询参数
   * @returns {Promise} 角色列表
   */
  getAll: (params) => request({
    url: '/sys/role/queryByParam',
    method: 'POST',
    data: params
  }),

  /**
   * 获取角色权限
   * @param {string} roleId - 角色ID
   * @returns {Promise} 权限信息
   */
  getPermissions: (roleId) => request({
    url: `/sys/permission/getPermissionByRoleId/id/${roleId}`,
    method: 'GET'
  }),

  /**
   * 删除角色
   * @param {string} roleId - 角色ID
   * @returns {Promise} 删除结果
   */
  delete: (roleId) => request({
    url: `/sys/role/id/${roleId}`,
    method: 'DELETE'
  })
}

/**
 * 权限管理相关接口
 */
export const permissionApi = {
  /**
   * 获取权限列表（分页）
   * @param {Object} urlSearch - URL查询参数
   * @param {Object} data - 请求数据
   * @returns {Promise} 权限列表
   */
  getList: (urlSearch, data) => request({
    url: '/sys/permission/queryPageByParam',
    method: 'POST',
    urlSearch,
    data,
    headers: {
      'content-type': 'application/json'
    }
  }),

  /**
   * 添加权限
   * @param {Object} params - 权限信息
   * @returns {Promise} 添加结果
   */
  add: (params) => request({
    url: '/sys/permission/add',
    method: 'POST',
    data: params
  }),

  /**
   * 获取所有权限
   * @param {Object} params - 查询参数
   * @returns {Promise} 权限列表
   */
  getAll: (params) => request({
    url: '/sys/permission/queryByParam',
    method: 'POST',
    data: params
  }),

  /**
   * 获取权限树
   * @param {Object} params - 查询参数
   * @returns {Promise} 权限树
   */
  getTree: (params) => request({
    url: '/sys/permission/listTree',
    method: 'POST',
    data: params
  }),

  /**
   * 删除权限
   * @param {string} permissionId - 权限ID
   * @returns {Promise} 删除结果
   */
  delete: (permissionId) => request({
    url: `/sys/permission/id/${permissionId}`,
    method: 'DELETE'
  })
}

/**
 * 合约相关接口
 */
export const contractApi = {
  /**
   * 获取支持的币种
   * @returns {Promise} 支持的币种列表
   */
  getSupportCoins: () => requestOkx({
    url: '/api/v5/rubik/stat/trading-data/support-coin',
    method: 'GET'
  }),

  /**
   * 获取杠杆多空比
   * @param {Object} data - 查询参数
   * @returns {Promise} 多空比数据
   */
  getLoanRatio: (data) => requestOkx({
    url: '/api/v5/rubik/stat/margin/loan-ratio',
    method: 'GET',
    data
  }),

  /**
   * 获取合约多空持仓人数比
   * @param {Object} data - 查询参数
   * @returns {Promise} 多空持仓比数据
   */
  getLongShortAccountRatio: (data) => requestOkx({
    url: '/api/v5/rubik/stat/contracts/long-short-account-ratio',
    method: 'GET',
    data
  }),

  /**
   * 获取Binance合约多空持仓人数比
   * @param {Object} data - 查询参数
   * @returns {Promise} 多空持仓比数据
   */
  getLongShortRatioByBinance: (data) => requestBinance({
    url: '/futures/data/globalLongShortAccountRatio',
    method: 'GET',
    data
  }),

  /**
   * 获取Binance合约未平仓合约量
   * @param {Object} data - 查询参数
   * @returns {Promise} 未平仓合约量数据
   */
  getOpenInterestByBinance: (data) => requestBinance({
    url: '/futures/data/openInterest',
    method: 'GET',
    data
  })
}

// 导出所有API模块
export default {
  auth: authApi,
  user: userApi,
  role: roleApi,
  permission: permissionApi,
  contract: contractApi
}
