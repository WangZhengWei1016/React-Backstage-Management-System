/* 
    redux最核心的管理对象：store
*/
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducer'

// 根据指定的reducer函数，生成一个store对象
// store对象内部管理新状态数据，状态数据的初始值为第一次调用reducer()的返回值
// 应用异步中间件
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))