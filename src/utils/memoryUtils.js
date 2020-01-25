/* 
 *  将user保存到内存中
 */

import localStorageUtils from './localStorageUtils'

// 初始时从local中读取一次，并保存为内存中的变量user
const user = localStorageUtils.getUser()
export default {
    user,
    // 保存当前商品
    product: {}
}