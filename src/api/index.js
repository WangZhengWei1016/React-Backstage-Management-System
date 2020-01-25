/* 
    包含应用中所有请求接口的函数：接口请求函数
    函数的返回值都是promise对象
*/

import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

const BASE = ''

// 请求登录
export const reqLogin = (username, password) => ajax.post(BASE + '/login', {username, password})

// 发送jsonp请求得到天气信息
export const reqWeather = city => {

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

// 发送请求获取分类列表
export const reqCategorys = () => ajax(BASE + '/manage/category/list')

// 添加分类
export const reqAddCategory = categoryName => ajax.post(BASE + '/manage/category/add', {
    categoryName
})

// 修改分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax.post(BASE + '/manage/category/update', {
    categoryId,
    categoryName
})

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', {
    params: {
        pageNum,
        pageSize
    }
})

// 根据Name/desc搜索产品分页列表
export const reqSearchProducts = (pageNum, pageSize, searchType, searchKeyWords) => ajax(BASE + '/manage/product/search', {
    params: {
        pageNum,
        pageSize,
        [searchType]: searchKeyWords
    }
})

// 对商品进行上架/下架处理
export const reqUpdateStatus = (status, productId) => ajax(BASE + '/manage/product/updateStatus', {
    method: 'post',
    data: {
        status,
        productId

    }
})

// 根据分类ID获取分类
export const reqCategory = categoryId => ajax(BASE + '/manage/category/info', {
    params: {
        categoryId
    }
})

/* 
    根据商品ID获取商品
*/

export const reqProduct = productId => ajax(BASE + '/manage/product/info', {
    params: {
        productId
    }
})

/* 
    删除图片
*/
export const reqDeleteImg = name => ajax.post(BASE + '/manage/img/delete', {name})

/* 
    添加/更新商品
*/
export const reqAddOrUpdateProduct = product => ajax.post(
    BASE + '/manage/product/' + (product._id ? 'update' : 'add'),
    product
)

/* 
    获取角色列表
*/
export const reqRoles = () => ajax(BASE + '/manage/role/list')

/* 
    添加角色
*/
export const reqAddRole = roleName => ajax.post(BASE + '/manage/role/add', {roleName})

/* 
    更新角色(给角色设置权限)
*/
export const reqUpdateRole = role => ajax.post(BASE + '/manage/role/update', role)

/* 
    获取所有用户列表
*/
export const reqUsers = () => ajax(BASE + '/manage/user/list')

/* 
    添加/更新用户
*/
export const reqAddOrUpdateUser = user => ajax.post(
    BASE + '/manage/user/' + (user._id ? 'update' : 'add'),
    user
)

/* 
    删除用户
*/
export const reqDeleteUser = userId => ajax.post(BASE + '/manage/user/delete', {userId})