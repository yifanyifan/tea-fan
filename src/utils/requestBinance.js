
import axios from 'axios'
import CryptoJS from 'crypto-js';

const requestBinance = axios.create({
    baseURL: 'https://fapi.binance.com',
    timeout: 60000
});



// 添加请求拦截器
requestBinance.interceptors.request.use(function (config) {
    const apiKey = ''; // 替换为您的实际 API 密钥
    const apiSecret = ''; // 替换为您的实际 API 密钥对应的密钥
  
    const timestamp = new Date().getTime(); // 当前时间戳（毫秒）
  
    // Step 1: 构建请求参数
    const { baseURL, url, method, data } = config;
    console.info("4444444444444444444444",JSON.stringify(config));

    const urlWithoutBase = url.replace(baseURL, ''); // 从 URL 中移除 baseURL
  
    const paramKeys = Object.keys(data || {}).sort();
    const paramPairs = paramKeys.map(key => `${key}=${data[key]}`);
    const payload = paramPairs.join('&');
  
    // Step 2: 计算签名
    const signaturePayload = `${payload}`;
    const signature = CryptoJS.HmacSHA256(signaturePayload, apiSecret).toString(CryptoJS.enc.Base64);
  
    // 更新请求头部信息
    config.headers['X-MBX-APIKEY'] = apiKey;
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  
    // 将时间戳和签名添加到 URL 中
    const finalUrl = `${urlWithoutBase}?${payload}&timestamp=${timestamp}&signature=${signature}`;
    config.url = `${baseURL}${finalUrl}`;
  
    return config;
}, function (error) {
// 处理请求错误
return Promise.reject(error);
});

// 添加响应拦截器
requestBinance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});



//自定义各种数据请求的axios
export default function ajaxBinance(config) {
    // 数据请求时我们需要什么参数
    // 1. 先获取请求的一些必要参数
    const { url = '', method = 'GET', data = {}, headers = {}, urlSearch = {} } = config

    // 2. 判断我们的请求的类型
    switch (method.toUpperCase()) {
        case 'GET':
            // get 请求规定配置参数时需要加一个 { params: 我们的参数 }
            return requestBinance.get(url, { params: data })
        // case 'POST':
        //     // 判断是否是 JSON 数据提交
        //     if (headers['content-type'] === 'application/json') {
        //         // 将 URL 参数附加到 URL 中
        //         const queryString = Object.keys(urlSearch).length > 0 ? new URLSearchParams(urlSearch).toString() : '';
        //         const fullUrl = queryString ? `${url}?${queryString}` : url;
                
        //         // 发送 POST 请求
        //         return requestBinance.post(fullUrl, data, { headers });
        //     }
        //     // 1. 表单提交数据
        //     if (headers['content-type'] == 'application/x-www-form-url-encoded') {
        //         //转换参数类型，格式化数据
        //         const obj = new URLSearchParams();
        //         for (const key in data) {
        //             obj.append(key, data[key]);
        //         }
        //         return requestBinance.post(url, obj, { headers });
        //     }
        //     // 2. 文件数据
        //     if (headers['content-type'] == 'multipart/form-data') {
        //         // 处理文件的对象
        //         const obj = new FormData();
        //         for (const key in data) {
        //             obj.append(key, data[key]);
        //         }
        //         return requestBinance.post(url, obj, { headers });
        //     }
        //     // 3. json数据提交
        //     return requestBinance.post(url, data);

        // case 'PUT': 
        //     //修改数据 --- 数据更新
        //     return requestBinance.put(url, data);
        // case 'DELETE': 
        //     //删除数据
        //     return requestBinance.delete(url, { data });
        // case 'PATCH': 
        //     //更新局部资源
        //     return requestBinance.patch(url, data);
        default:
            // 如果前面全部都不是
            return requestBinance.request(config);
    }
}