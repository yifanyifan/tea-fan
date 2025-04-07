import request from '@/utils/request'

/**
 * 获取地图数据
 * @returns {Promise} 地图数据
 */
export const getMapData = () => {
  return request({
    url: '/map/data',
    method: 'get'
  })
} 