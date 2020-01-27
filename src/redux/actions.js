/* 
    包含N个用户创建action对象(同步)/函数(异步)的工厂函数(action creator)
*/
import { message } from 'antd'

import {
    SET_HEADER_TITLE,
    RECIVE_USER,
    SHOW_ERROR,
    LOGOUT
} from './action-types'
import { reqLogin } from "../api"
import localStorageUtils from '../utils/localStorageUtils';

// 设置头部标题的同步action 
export const setHeaderTitle = headerTitle => ({type: SET_HEADER_TITLE, data: headerTitle})

// 接受用户(登录成功)的同步action
export const reciveUser = user => {
    // 将user保存到local中
    localStorageUtils.saveUser(user)

    return {type: RECIVE_USER, user}
}

// 显示登录错误信息的同步action
export const showError = (errorMsg) => ({type: SHOW_ERROR, errorMsg})

// 退出登录的同步action
export const logout = () => {
    // 清除local中的user
    localStorageUtils.removeUser()

    return {type: LOGOUT}
}

// 登录的异步action
export const login = (username, password) => async dispatch => {
    // 1. 发送登陆的异步ajax请求
    const result = await reqLogin(username, password)
    // 2. 请求结束后，分发同步action
    if (result.status === 0) { // 2.1 如果请求成功，则发送成功的同步action
        const user = result.data
        dispatch(reciveUser(user))
    } else { // 2.2 如果请求失败，则发送失败的同步action
        const errorMsg = result.msg
        dispatch(showError(errorMsg))
        message.error(errorMsg)
    }
}