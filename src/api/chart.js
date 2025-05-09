/**
 * 图表数据相关API接口
 * @module chart
 */

import { request } from '@/utils/request'

/**
 * 图表API接口
 */
export const chartApi = {
  /**
   * 获取图表数据
   * @description 获取图表展示所需的数据
   * @param {Object} params - 查询参数
   * @param {string} params.type - 图表类型
   * @param {string} [params.timeRange] - 时间范围
   * @param {string} [params.interval] - 数据间隔
   * @returns {Promise<Object>} 图表数据
   * @property {Array} xAxis - X轴数据
   * @property {Array} series - 系列数据
   */
  getData: (params) => request({
    url: '/chart/data',
    method: 'GET',
    params
  }),

  /**
   * 获取图表配置
   * @description 获取图表的配置信息
   * @param {string} type - 图表类型
   * @returns {Promise<Object>} 图表配置
   */
  getConfig: (type) => request({
    url: `/chart/config/${type}`,
    method: 'GET'
  }),

  /**
   * 获取图表统计数据
   * @description 获取图表的统计信息
   * @param {Object} params - 查询参数
   * @param {string} params.type - 图表类型
   * @param {string} [params.timeRange] - 时间范围
   * @returns {Promise<Object>} 统计数据
   */
  getStatistics: (params) => request({
    url: '/chart/statistics',
    method: 'GET',
    params
  })
}

export default chartApi 