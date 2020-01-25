/* 
    商品管理
*/
import React, { Component } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";

import ProductHome from './ProductHome'
import ProductAddUpdate from './ProductAddUpdate'
import ProductDetail from './ProductDetail'
import './Product.less'

export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product' exact component={ProductHome}/>
                <Route path='/product/addupdate' component={ProductAddUpdate}/>
                <Route path='/product/detail/:id' component={ProductDetail}/>
                <Redirect to='/product' />
            </Switch>
        )
    }
}
