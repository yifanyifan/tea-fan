import axios from 'axios'
import { ElMessage } from 'element-plus'
import CryptoJS from 'crypto-js'

/**
 * 创建币安 API 请求实例
 */
const binanceService = axios.create({
  baseURL: 'https://api.binance.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * 生成签名
 * @param {Object} params - 请求参数
 * @param {string} secretKey - API密钥
 * @returns {string} 签名
 */
const generateSignature = (params, secretKey) => {
  const queryString = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&')

  return CryptoJS.HmacSHA256(queryString, secretKey).toString()
}

/**
 * 添加公共参数
 * @param {Object} params - 原始参数
 * @returns {Object} 添加时间戳后的参数
 */
const addCommonParams = (params = {}) => {
  return {
    ...params,
    timestamp: Date.now(),
    recvWindow: 5000
  }
}

/**
 * 发送签名请求
 * @param {Object} options - 请求配置
 * @returns {Promise} 请求Promise
 */
const sendSignedRequest = async (options) => {
  try {
    const apiKey = localStorage.getItem('binanceApiKey')
    const secretKey = localStorage.getItem('binanceSecretKey')

    if (!apiKey || !secretKey) {
      throw new Error('请先配置币安 API 密钥')
    }

    const params = addCommonParams(options.params)
    const signature = generateSignature(params, secretKey)

    const response = await binanceService({
      ...options,
      params: {
        ...params,
        signature
      },
      headers: {
        'X-MBX-APIKEY': apiKey
      }
    })

    return response.data
  } catch (error) {
    console.error('币安 API 请求失败:', error)
    ElMessage.error(error.message || '请求失败')
    throw error
  }
}

export default {
  /**
   * 获取账户信息
   * @returns {Promise} 账户信息
   */
  getAccountInfo() {
    return sendSignedRequest({
      method: 'get',
      url: '/api/v3/account'
    })
  },

  /**
   * 获取交易历史
   * @param {string} symbol - 交易对
   * @returns {Promise} 交易历史
   */
  getTradeHistory(symbol) {
    return sendSignedRequest({
      method: 'get',
      url: '/api/v3/myTrades',
      params: { symbol }
    })
  },

  /**
   * 下单
   * @param {Object} orderParams - 订单参数
   * @returns {Promise} 下单结果
   */
  createOrder(orderParams) {
    return sendSignedRequest({
      method: 'post',
      url: '/api/v3/order',
      params: orderParams
    })
  }
}