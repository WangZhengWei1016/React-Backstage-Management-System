import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'

// 添加请求拦截器，将post请求请求体携带的参数变为urlencoded格式 （即a=1&b=2）
axios.interceptors.request.use((config) => {
    // 得到请求方式和请求体数据
    const {method, data} = config
    
    if (method.toLowerCase() === 'post' && typeof data === 'object') {
        config.data = qs.stringify(data)
    }
    return config
})

// 添加相应拦截器
axios.interceptors.response.use((response) => {
    return response.data
}, (error) => {
    message.error('请求出错' + error.message)
    // 返回一个pending状态的promise，中断promise
    return new Promise(() => {})
})

export default axios