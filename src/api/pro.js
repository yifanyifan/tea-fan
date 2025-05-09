/**
 * 商品相关API接口
 * @module pro
 */

import { request } from '@/utils/request'

/**
 * 商品API接口
 */
export const proApi = {
  /**
   * 获取商品列表
   * @description 获取所有商品列表
   * @param {Object} params - 查询参数
   * @param {number} [params.page] - 页码
   * @param {number} [params.size] - 每页数量
   * @param {string} [params.category] - 商品分类
   * @param {string} [params.status] - 商品状态
   * @returns {Promise<Object>} 商品列表数据
   * @property {Array} list - 商品列表
   * @property {number} total - 总数量
   */
  getList: (params) => request({
    url: '/pro/list',
    method: 'GET',
    params
  }),

  /**
   * 获取商品详情
   * @description 获取指定商品的详细信息
   * @param {number} id - 商品ID
   * @returns {Promise<Object>} 商品详情
   */
  getDetail: (id) => request({
    url: `/pro/detail/${id}`,
    method: 'GET'
  }),

  /**
   * 添加商品
   * @description 添加新商品
   * @param {Object} data - 商品数据
   * @param {string} data.name - 商品名称
   * @param {string} data.description - 商品描述
   * @param {number} data.price - 商品价格
   * @param {string} data.category - 商品分类
   * @param {string} data.image - 商品图片
   * @returns {Promise<Object>} 添加结果
   */
  add: (data) => request({
    url: '/pro/add',
    method: 'POST',
    data
  }),

  /**
   * 更新商品
   * @description 更新商品信息
   * @param {Object} data - 更新数据
   * @param {number} data.id - 商品ID
   * @param {string} [data.name] - 商品名称
   * @param {string} [data.description] - 商品描述
   * @param {number} [data.price] - 商品价格
   * @param {string} [data.category] - 商品分类
   * @returns {Promise<Object>} 更新结果
   */
  update: (data) => request({
    url: '/pro/update',
    method: 'PUT',
    data
  }),

  /**
   * 删除商品
   * @description 删除指定商品
   * @param {number} id - 商品ID
   * @returns {Promise<Object>} 删除结果
   */
  delete: (id) => request({
    url: `/pro/delete/${id}`,
    method: 'DELETE'
  })
}

export default proApi