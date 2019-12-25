/* 
 *  将user保存到内存中
 */

import localStorageUtils from './localStorageUtils'

export default {
    // user的初始值从local中读取
    user: localStorageUtils.getUser()
}