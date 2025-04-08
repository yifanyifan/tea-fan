/**
 * BRC20相关API接口
 * @module brc20
 */

import request from '@/utils/request'

/**
 * BRC20 API接口
 */
export const brc20Api = {
  /**
   * 获取BRC20代币数据
   * @description 获取BRC20代币的总体数据，包括市值、交易量等
   * @returns {Promise<Object>} BRC20代币数据
   * @property {number} marketCap - 市值
   * @property {number} volume24h - 24小时交易量
   * @property {number} holders - 持有者数量
   * @property {Array} topTokens - 热门代币列表
   */
  getData: () => request({
    url: '/brc20/data',
    method: 'get'
  }),

  /**
   * 获取铭文列表
   * @description 获取BRC20铭文列表，支持分页和条件查询
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.size - 每页数量
   * @param {string} [params.token] - 代币名称
   * @param {string} [params.status] - 铭文状态
   * @returns {Promise<Object>} 铭文列表数据
   * @property {Array} list - 铭文列表
   * @property {number} total - 总数量
   */
  getInscriptions: (params) => request({
    url: '/inscriptions/list',
    method: 'get',
    params
  }),

  /**
   * 获取代币详情
   * @description 获取指定BRC20代币的详细信息
   * @param {string} token - 代币名称
   * @returns {Promise<Object>} 代币详情
   */
  getTokenDetail: (token) => request({
    url: `/brc20/token/${token}`,
    method: 'get'
  }),

  /**
   * 获取代币持有者列表
   * @description 获取指定BRC20代币的持有者列表
   * @param {string} token - 代币名称
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.size - 每页数量
   * @returns {Promise<Object>} 持有者列表
   */
  getHolders: (token, params) => request({
    url: `/brc20/holders/${token}`,
    method: 'get',
    params
  })
}

export default brc20Api 