import axios from 'axios'
import { ElMessage } from 'element-plus'
import CryptoJS from 'crypto-js'

/**
 * 创建 OKX API 请求实例
 */
const okxService = axios.create({
  baseURL: 'https://www.okx.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * 生成 OKX 签名
 * @param {string} timestamp - 时间戳
 * @param {string} method - 请求方法
 * @param {string} requestPath - 请求路径
 * @param {string} body - 请求体
 * @param {string} secretKey - API密钥
 * @returns {string} 签名
 */
const generateOkxSignature = (timestamp, method, requestPath, body, secretKey) => {
  const message = `${timestamp}${method}${requestPath}${body}`
  return CryptoJS.HmacSHA256(message, secretKey).toString(CryptoJS.enc.Base64)
}

/**
 * 发送 OKX 签名请求
 * @param {Object} options - 请求配置
 * @returns {Promise} 请求Promise
 */
const sendOkxRequest = async (options) => {
  try {
    const apiKey = localStorage.getItem('okxApiKey')
    const secretKey = localStorage.getItem('okxSecretKey')
    const passphrase = localStorage.getItem('okxPassphrase')

    if (!apiKey || !secretKey || !passphrase) {
      throw new Error('请先配置 OKX API 密钥')
    }

    const timestamp = new Date().toISOString()
    const body = options.data ? JSON.stringify(options.data) : ''
    const signature = generateOkxSignature(
      timestamp,
      options.method.toUpperCase(),
      options.url,
      body,
      secretKey
    )

    const response = await okxService({
      ...options,
      headers: {
        'OK-ACCESS-KEY': apiKey,
        'OK-ACCESS-SIGN': signature,
        'OK-ACCESS-TIMESTAMP': timestamp,
        'OK-ACCESS-PASSPHRASE': passphrase
      }
    })

    return response.data
  } catch (error) {
    console.error('OKX API 请求失败:', error)
    ElMessage.error(error.message || '请求失败')
    throw error
  }
}

export default {
  /**
   * 获取账户余额
   * @returns {Promise} 账户余额
   */
  getBalance() {
    return sendOkxRequest({
      method: 'get',
      url: '/api/v5/account/balance'
    })
  },

  /**
   * 获取持仓信息
   * @returns {Promise} 持仓信息
   */
  getPositions() {
    return sendOkxRequest({
      method: 'get',
      url: '/api/v5/account/positions'
    })
  },

  /**
   * 下单
   * @param {Object} orderParams - 订单参数
   * @returns {Promise} 下单结果
   */
  placeOrder(orderParams) {
    return sendOkxRequest({
      method: 'post',
      url: '/api/v5/trade/order',
      data: orderParams
    })
  }
}