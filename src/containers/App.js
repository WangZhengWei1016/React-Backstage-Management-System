/* 
    通过包装UI组件(Counter)生成容器组件
    容器组件：通过connect函数产生的
*/
import { connect } from 'react-redux'

import Counter from '../components/Counter'
import { increment, decrement, incrementAsync } from '../redux/actions'

/* 
    将特定state数据映射(转换)成标签属性传递给UI组件(Counter)
    redux在调用此函数时，传入了store.getState()的值
*/
/* const mapStateToProps = (state) => ({ // 返回的对象的所有属性传递给UI组件
    count: state
}) */

/* 
    将包含dispatch函数调用语句的函数映射(转换)成函数属性传递给UI组件(Counter)
    redux在调用此函数时，传入了store.dispatch的值
*/
/* const mapDispatchToProps = (dispatch) => ({
    increment: number => {dispatch(increment(number))},
    decrement: number => {dispatch(decrement(number))},
    incrementAsync: number => {dispatch(incrementAsync(number))},
}) */

/* export default connect(
    mapStateToProps, // 用来指定传递哪些一般属性
    mapDispatchToProps // 用来指定传递哪些函数属性
)(Counter) */

export default connect(
    state => ({count: state}),
    {increment, decrement, incrementAsync}
)(Counter)

/* 
    容器组件
        —— 通过包装UI组件产生的组件
    容器组件时UI组件的父组件
    容器组件负责向UI组件传入标签属性
        一般属性：由第一个函数参数的返回值对象决定，属性值从state取出
        函数属性：由第二个参数决定
            参数是函数：函数返回的对象中的所有方法作为函数属性传递给UI组件
            参数是对象：包装对象中的每个方法，将包装后的方法作为函数属性传递给UI组件
                function(...args) {dispatch(increment(...args))}
*/