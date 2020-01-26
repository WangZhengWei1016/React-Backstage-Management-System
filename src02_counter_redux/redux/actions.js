/* 
    包含用N个用于创建action对象的工厂函数
*/
import { INCREMENT, DECREMENT } from './action-types'

// 创建增加的action对象
export const increment = (number) => ({type: INCREMENT, number})

// 创建减少的action对象
export const decrement = (number) => ({type: DECREMENT, number})