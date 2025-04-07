import request from '@/utils/request'

/**
 * 获取产品列表
 * @param {Object} params - 查询参数
 */
export const getProductList = (params) => {
  return request({
    url: '/product/list',
    method: 'get',
    params
  })
}

/**
 * 添加产品
 * @param {Object} data - 产品数据
 */
export const addProduct = (data) => {
  return request({
    url: '/product/add',
    method: 'post',
    data
  })
}

/**
 * 更新产品状态
 * @param {Object} data - 更新数据
 */
export const updateProductStatus = (data) => {
  return request({
    url: '/product/status',
    method: 'put',
    data
  })
}

/**
 * 删除产品
 * @param {number} id - 产品ID
 */
export const deleteProduct = (id) => {
  return request({
    url: `/product/delete/${id}`,
    method: 'delete'
  })
} 