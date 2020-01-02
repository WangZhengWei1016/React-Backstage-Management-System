/* 
    包含应用中所有请求接口的函数：接口请求函数
    函数的返回值都是promise对象
*/

import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

// 请求登录
const BASE = ''
export const reqLogin = (username, password) => ajax.post(BASE + '/login', {username, password})

// 发送jsonp请求得到天气信息
export const reqWeather = (city) => {

    // 执行器函数：内部去执行异步任务
    // 成功了调用resolve(), 失败了不调用reject(), 而是直接提示错误
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (err, data) => {
            if(!err && data.error === 0) {
                const dayPictureUrl = data.results[0].weather_data[0].dayPictureUrl
                const weather = data.results[0].weather_data[0].weather
                const temperature = data.results[0].weather_data[0].temperature
                resolve({dayPictureUrl, weather, temperature})
            } else {
                message.error('获取天气信息失败')
            }
        })
    })
}