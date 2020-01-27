/* 
    左侧导航组件
*/
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './LeftNav.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import { setHeaderTitle } from '../../redux/actions'

const { SubMenu } = Menu

class LeftNav extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        serHeaderTitle: PropTypes.func
    }

    /* 
        根据menuList生成对应的<Menu.Item />或<SubMenu />节点
        reduce + 函数递归
    */
    getMenuNodes = (menuList) => {

        // 请求的路径
        const path = this.props.location.pathname

        return menuList.reduce((preList, item) => {

            if (path === item.key || path.indexOf(item.key) === 0) {
                this.props.setHeaderTitle(item.title)
            }

            // 判断当前用户是否有此条item对应的权限，如果有，将此条item的信息push到preList中展示
            if (this.hasAuthority(item)) {
                if (!item.children) {
                    preList.push(
                        <Menu.Item key={item.key}>
                            <Link to={item.key} onClick={() => {this.props.setHeaderTitle(item.title)}}>
                                <Icon type={item.icon}></Icon>
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                } else {
    
                    /* 
                        判断当前item的key是否为需要的opneKeys
                            查找当前item中所有的cItem的key，比较是否和当前访问的path匹配
                     */
                    {
                        const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                        if (cItem) {
                            this.openKeys = item.key
                        }
                    }
    
                    preList.push(
                        <SubMenu key={item.key}
                            title={
                                <span> 
                                    <Icon type={item.icon}></Icon>
                                    <span>{item.title}</span>
                                </span>
                            }
                        >
                            {
                                this.getMenuNodes(item.children)
                            }
                        </SubMenu>
                    )
                }
            }

            return preList
        }, [])
    }

    /* 
        判断当前用户是否有此条item对应的权限
    */
    hasAuthority = (item) => {
        
        const { user } = this.props
        const { menus } = user.role
        // 1.当前用户为admin
        // 2.此条item为public公开展示
        // 3.登录用户有此item的权限
        if (user.username === 'admin' || item.public || menus.indexOf(item.key) !== -1) {
            return true
        } else if (item.children) { // 如果当前用户有此item的某个子节点的权限，当前item也应该显示
            const cItem = item.children.find((cItem) => menus.indexOf(cItem.key) !== -1)
            return !!cItem
        }
        return false
    }

    /* 
        根据menuList生成对应的<Menu.Item />或<SubMenu />节点
        map + 函数递归
    */
    /* getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}></Icon>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }

            return (
                <SubMenu key={item.key}
                    title={
                        <span>
                            <Icon type={item.icon}></Icon>
                            <span>{item.title}</span>
                        </span>
                    }
                >
                    {
                        this.getMenuNodes(item.children)
                    }
                </SubMenu>
            )
        })
    } */

    UNSAFE_componentWillMount () {
        this.menuNodes = this.getMenuNodes(menuList)
    }

    render() {
        
        let selectedKey = this.props.location.pathname
        // 处理 /product/detail 和 /product/addUpdate 左侧导航不选中的bug
        if (selectedKey.indexOf('/product') === 0) {
            selectedKey = '/product'
        }
        
        return (
            <div className='left-nav'>
                <Link className='left-nav-link' to='/'>
                    <img src={logo} alt="logo" />
                    <h2>后台管理系统</h2>
                </Link>
                <Menu
                    /* 
                        defaultSelectedKeys 总是根据第一次指定的key进行显示
                        selectedKeys 根据最新指定的key进行显示
                    */
                    selectedKeys={[selectedKey]}
                    defaultOpenKeys={[this.openKeys]}
                    mode='inline'
                    theme="dark"
                >
                    {
                        // this.getMenuNodes(menuList)
                        this.menuNodes
                    }
                </Menu>
            </div>
        )
    }
}

/* 
    使用高阶组件withRouter()来包装非路由组件
    新组件向LeftNav传递三个参数，history / location / match
    从而使LeftNav可以使用路由的相关语法
*/
export default connect(
    state => ({user: state.user}),
    {setHeaderTitle}
)(withRouter(LeftNav))
