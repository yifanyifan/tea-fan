/**
 * 轮播图相关API接口
 * @module banner
 */

import { request } from '@/utils/request'

/**
 * 轮播图API接口
 */
export const bannerApi = {
  /**
   * 获取轮播图列表
   * @description 获取所有轮播图列表
   * @returns {Promise<Array>} 轮播图列表
   * @property {number} id - 轮播图ID
   * @property {string} image - 图片地址
   * @property {string} title - 标题
   * @property {string} link - 链接地址
   * @property {number} sort - 排序
   * @property {string} status - 状态
   */
  getList: () => request({
    url: '/banner/list',
    method: 'GET'
  }),

  /**
   * 添加轮播图
   * @description 添加新的轮播图
   * @param {Object} data - 轮播图数据
   * @param {string} data.image - 图片地址
   * @param {string} data.title - 标题
   * @param {string} data.link - 链接地址
   * @param {number} data.sort - 排序
   * @returns {Promise<Object>} 添加结果
   */
  add: (data) => request({
    url: '/banner/add',
    method: 'POST',
    data
  }),

  /**
   * 更新轮播图
   * @description 更新轮播图信息
   * @param {Object} data - 更新数据
   * @param {number} data.id - 轮播图ID
   * @param {string} [data.image] - 图片地址
   * @param {string} [data.title] - 标题
   * @param {string} [data.link] - 链接地址
   * @param {number} [data.sort] - 排序
   * @param {string} [data.status] - 状态
   * @returns {Promise<Object>} 更新结果
   */
  update: (data) => request({
    url: '/banner/update',
    method: 'PUT',
    data
  }),

  /**
   * 删除轮播图
   * @description 删除指定轮播图
   * @param {number} id - 轮播图ID
   * @returns {Promise<Object>} 删除结果
   */
  delete: (id) => request({
    url: `/banner/delete/${id}`,
    method: 'DELETE'
  }),

  /**
   * 更新轮播图状态
   * @description 更新轮播图的显示状态
   * @param {Object} data - 更新数据
   * @param {number} data.id - 轮播图ID
   * @param {string} data.status - 新状态
   * @returns {Promise<Object>} 更新结果
   */
  updateStatus: (data) => request({
    url: '/banner/status',
    method: 'PUT',
    data
  })
}

export default bannerApi

//k线图

//交易图