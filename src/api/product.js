/**
 * 产品相关API接口
 * @module product
 */

import request from '@/utils/request'

/**
 * 产品API接口
 */
export const productApi = {
  /**
   * 获取产品列表
   * @description 获取产品列表，支持分页和条件查询
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.size - 每页数量
   * @param {string} [params.keyword] - 搜索关键词
   * @param {string} [params.category] - 产品分类
   * @param {string} [params.status] - 产品状态
   * @returns {Promise<Object>} 产品列表数据
   * @property {Array} list - 产品列表
   * @property {number} total - 总数量
   */
  getList: (params) => request({
    url: '/product/list',
    method: 'get',
    params
  }),

  /**
   * 添加产品
   * @description 添加新产品
   * @param {Object} data - 产品数据
   * @param {string} data.name - 产品名称
   * @param {string} data.description - 产品描述
   * @param {number} data.price - 产品价格
   * @param {string} data.category - 产品分类
   * @param {string} data.image - 产品图片
   * @returns {Promise<Object>} 添加结果
   */
  add: (data) => request({
    url: '/product/add',
    method: 'post',
    data
  }),

  /**
   * 更新产品状态
   * @description 更新产品状态（上架/下架）
   * @param {Object} data - 更新数据
   * @param {number} data.id - 产品ID
   * @param {string} data.status - 新状态
   * @returns {Promise<Object>} 更新结果
   */
  updateStatus: (data) => request({
    url: '/product/status',
    method: 'put',
    data
  }),

  /**
   * 删除产品
   * @description 删除指定产品
   * @param {number} id - 产品ID
   * @returns {Promise<Object>} 删除结果
   */
  delete: (id) => request({
    url: `/product/delete/${id}`,
    method: 'delete'
  }),

  /**
   * 获取产品详情
   * @description 获取指定产品的详细信息
   * @param {number} id - 产品ID
   * @returns {Promise<Object>} 产品详情
   */
  getDetail: (id) => request({
    url: `/product/detail/${id}`,
    method: 'get'
  }),

  /**
   * 更新产品信息
   * @description 更新产品的基本信息
   * @param {Object} data - 产品数据
   * @param {number} data.id - 产品ID
   * @param {string} data.name - 产品名称
   * @param {string} data.description - 产品描述
   * @param {number} data.price - 产品价格
   * @returns {Promise<Object>} 更新结果
   */
  update: (data) => request({
    url: '/product/update',
    method: 'put',
    data
  })
}

export default productApi 