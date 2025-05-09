/**
 * 地图相关API接口
 * @module map
 */

import { request } from '@/utils/request'

/**
 * 地图API接口
 */
export const mapApi = {
  /**
   * 获取地图数据
   * @description 获取地图展示所需的所有数据，包括地理信息、统计数据等
   * @returns {Promise<Object>} 地图数据对象
   * @property {Array} regions - 区域数据
   * @property {Array} markers - 标记点数据
   * @property {Object} statistics - 统计数据
   */
  getData: () => request({
    url: '/map/data',
    method: 'GET'
  }),

  /**
   * 获取区域详情
   * @description 获取指定区域的详细信息
   * @param {string} regionId - 区域ID
   * @returns {Promise<Object>} 区域详情数据
   */
  getRegionDetail: (regionId) => request({
    url: `/map/region/${regionId}`,
    method: 'GET'
  }),

  /**
   * 更新地图标记
   * @description 更新地图上的标记点信息
   * @param {Object} marker - 标记点数据
   * @returns {Promise<Object>} 更新结果
   */
  updateMarker: (marker) => request({
    url: '/map/marker',
    method: 'PUT',
    data: marker
  })
}

export default mapApi 