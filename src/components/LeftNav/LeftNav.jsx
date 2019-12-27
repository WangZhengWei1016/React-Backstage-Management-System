/* 
    左侧导航组件
*/
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'

import './LeftNav.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu

class LeftNav extends Component {

    /* 
        根据menuList生成对应的<Menu.Item />或<SubMenu />节点
        reduce + 函数递归
    */
    getMenuNodes2 = (menuList) => {

        // 请求的路径
        const path = this.props.location.pathname

        return menuList.reduce((preList, item) => {

            if (!item.children) {
                preList.push(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
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
                    const cItem = item.children.find(item => item.key === path)
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
                            this.getMenuNodes2(item.children)
                        }
                    </SubMenu>
                )
            }
            return preList
        }, [])
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


    render() {

        const menuNodes = this.getMenuNodes2(menuList)

        const selectedKey = this.props.location.pathname
        // console.log(selectedKey)
        // console.log(this.openKeys)
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
                        menuNodes
                    }
                    {/* <Menu.Item key='/home'>
                        <Link to='/home'>
                            <Icon type='home'></Icon>
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key='products'
                        title={
                            <span>
                                <Icon type='appstore'></Icon>
                                <span>商品</span>
                            </span>
                        }
                    >
                        <Menu.Item key='/products/category'>
                            <Link to='/products/category'>
                                <Icon type='unordered-list'></Icon>
                                <span>品类管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key='/products/product'>
                            <Link to='/products/product'>
                                <Icon type="tool" />
                                <span>商品管理</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key='/user'>
                        <Link to='/user'>
                            <Icon type='user'></Icon>
                            <span>用户管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key='/role'>
                        <Link to='/role'>
                            <Icon type='safety'></Icon>
                            <span>角色管理</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key='/charts'
                        title={
                            <span>
                                <Icon type='area-chart'></Icon>
                                <span>图形图标</span>
                            </span>
                        }
                    >
                        <Menu.Item key='/charts/bar'>
                            <Link to='/charts/bar'>
                                <Icon type='bar-chart'></Icon>
                                <span>柱形图</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key='/charts/line'>
                            <Link to='/charts/line'>
                                <Icon type='line-chart'></Icon>
                                <span>折线图</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key='/charts/pie'>
                            <Link to='/charts/pie'>
                                <Icon type='pie-chart'></Icon>
                                <span>饼图</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu> */}
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
export default withRouter(LeftNav)
