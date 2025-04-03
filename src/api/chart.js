import request from '@/utils/request'

export const getChartData = (params) => {
  return request({
    url: '/chart/data',
    method: 'get',
    params
  })
} 