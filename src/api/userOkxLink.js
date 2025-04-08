/**
 * OKX链上数据相关API接口
 * @module userOkxLink
 */

import ajaxOkxLink from '@/utils/requestOkxLink'

/**
 * OKX链上数据API接口
 */
export const okxLinkApi = {
  /**
   * 获取铭刻列表
   * @description 获取BTC链上的铭刻列表
   * @param {Object} data - 查询参数
   * @param {number} data.page - 页码
   * @param {number} data.size - 每页数量
   * @param {string} [data.token] - 代币名称
   * @param {string} [data.status] - 铭刻状态
   * @returns {Promise<Object>} 铭刻列表数据
   * @property {Array} list - 铭刻列表
   * @property {number} total - 总数量
   */
  getInscriptionsList: (data) => ajaxOkxLink({
    url: '/api/v5/explorer/btc/inscriptions-list',
    method: 'GET',
    data
  }),

  /**
   * 获取代币列表
   * @description 获取BTC链上的代币列表
   * @param {Object} data - 查询参数
   * @param {number} data.page - 页码
   * @param {number} data.size - 每页数量
   * @param {string} [data.type] - 代币类型
   * @param {string} [data.sort] - 排序方式
   * @returns {Promise<Object>} 代币列表数据
   * @property {Array} list - 代币列表
   * @property {number} total - 总数量
   */
  getTokenList: (data) => ajaxOkxLink({
    url: '/api/v5/explorer/btc/token-list',
    method: 'GET',
    data
  }),

  /**
   * 获取代币详情
   * @description 获取指定代币的详细信息
   * @param {string} token - 代币名称
   * @returns {Promise<Object>} 代币详情
   */
  getTokenDetail: (token) => ajaxOkxLink({
    url: `/api/v5/explorer/btc/token/${token}`,
    method: 'GET'
  }),

  /**
   * 获取代币持有者列表
   * @description 获取指定代币的持有者列表
   * @param {string} token - 代币名称
   * @param {Object} data - 查询参数
   * @param {number} data.page - 页码
   * @param {number} data.size - 每页数量
   * @returns {Promise<Object>} 持有者列表
   */
  getTokenHolders: (token, data) => ajaxOkxLink({
    url: `/api/v5/explorer/btc/token/${token}/holders`,
    method: 'GET',
    data
  })
}

export default okxLinkApi
















