// src/utils/request.js
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

//封装 baseUrl 

//开发环境(写代码的阶段)    生产环境(代码已经部署服务器)    测试环境(代码写好阶段)
//development               production                      production
//npm run dev               npm run build                   npm run build           

//获取当前环境，判断当前环境是否为开发环境
const isDev = process.env.NODE_ENV =='development';
/**
 * 开发阶段：192.168.1.111
 * 生产阶段：http://121.90.205.189
 */

/**
 * 创建 axios 实例
 * @description 用于普通的HTTP请求
 */
const service = axios.create({
    // 从环境变量获取基础URL
    baseURL: import.meta.env.VITE_API_URL || '/api',
    // 请求超时时间
    timeout: 15000,
    // 请求头设置
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
});

/**
 * 请求拦截器
 * @description 在请求发送前处理请求配置
 */
service.interceptors.request.use(
    config => {
        // 从localStorage获取token
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error => {
        console.error('请求拦截器错误:', error)
        return Promise.reject(error)
    }
)

/**
 * 响应拦截器
 * @description 在收到响应后统一处理响应数据
 */
service.interceptors.response.use(
    response => {
        const { code, msg, data } = response.data

        // 处理成功响应
        if (code === '200' || code === 200) {
            return response.data
        }

        // 处理特定错误码
        switch (code) {
            case '401':
                ElMessage.error('登录已过期，请重新登录')
                localStorage.clear()
                router.push('/login')
                break
            case '403':
                ElMessage.error('没有访问权限')
                break
            default:
                ElMessage.error(msg || '请求失败')
        }

        return Promise.reject(response.data)
    },
    error => {
        // 处理网络错误
        const message = error.response?.status === 404 
            ? '请求的资源不存在' 
            : error.message || '网络错误'
        
        ElMessage.error(message)
        return Promise.reject(error)
    }
)

//自定义各种数据请求的axios
export default service


