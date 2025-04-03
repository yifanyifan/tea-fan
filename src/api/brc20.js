import request from '@/utils/request'

// 获取BRC20代币数据
export const getBrc20Data = () => {
  return request({
    url: '/brc20/data',
    method: 'get'
  })
}

// 获取铭文列表
export const getInscriptionsList = (params) => {
  return request({
    url: '/inscriptions/list',
    method: 'get',
    params
  })
} 