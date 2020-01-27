import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from "antd"
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import LeftNav from '../../components/LeftNav/LeftNav'
import Header from '../../components/Header/Header'
import Home from '../Home/Home'
import Category from '../Category/Category'
import Product from '../Product/Product'
import User from '../User/User'
import Role from '../Role/Role'
import Bar from '../Charts/Bar'
import Line from '../Charts/Line'
import Pie from '../Charts/Pie'

const { Sider, Content, Footer } = Layout

class Admin extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired
    }

    render() {
        
        // 读取localStorage中保存的user_key，如果不存在，则直接跳转到登录界面
        // const user = JSON.parse(localStorage.getItem('user_key') || '{}')
        const user = this.props.user
        if (!user._id) {
            return <Redirect to="/login" />
        }

        return (
            <Layout style={{'height': '100%'}}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header />
                    <Content style={{'background': 'white', 'margin': '20px'}}>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/user' component={User} />
                            <Route path='/role' component={Role} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie} />
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer style={{'textAlign': 'center', 'color': '#999'}}>推荐使用Chrome浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {}
)(Admin)
