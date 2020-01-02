import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from "antd";

import './Header.less'
import memoryUtils from "../../utils/memoryUtils";
import localStorageUtils from "../../utils/localStorageUtils";
import menuList from "../../config/menuConfig";
import formateDate from '../../utils/dateFormate'
import { reqWeather } from '../../api'
import LinkButton from '../LinkButton/LinkButton'

const { confirm } = Modal

class Header extends Component {

    state = {
        currentTime: formateDate(Date.now()),
        dayPictureUrl: '',
        weather: '',
        temperature: ''
    }

    componentDidMount () {
        setInterval(() => {
            this.setState({
                currentTime: formateDate(Date.now())
            })
        }, 1000)

        // 发送jsonp请求获取天气信息
        this.getWeather()
    }

    getWeather = async () => {
        const {dayPictureUrl, weather, temperature} = await reqWeather('南京')

        // 更新状态
        this.setState({
            dayPictureUrl,
            weather,
            temperature
        })
    }

    /* 
        退出登录
    */
    logout = () => {
        // 显示确认提示
        confirm({
            title: '确认退出登录吗?',
            onOk: () => {
                // 确认后，删除存储的用户信息
                // 1.删除local中的信息
                localStorageUtils.removeUser()
                // 2.删除内存中的信息
                memoryUtils.user = {}

                this.props.history.replace('/login')
            },
            onCancel() {
                
            },
            okText: '确认',
            cancelText: '取消'
        })
    }

    getTitle = () => {
        let title = ''
        menuList.forEach(item => {
            if (this.props.location.pathname === item.key) {
                title = item.title
            }else if(item.children) {
                item.children.forEach(cItem => {
                    if (this.props.location.pathname === cItem.key) {
                        title = cItem.title
                    }
                })
            }
        })
        return title
    }

    render() {

        const { user } = memoryUtils

        let title = this.getTitle()

        return (
            <div className='header'>
                <div className='header-top'>
                    欢迎，{user.username}
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{this.state.currentTime}</span>
                        <img src={this.state.dayPictureUrl} alt="weather"/>
                        <span>{this.state.weather + ' ' + this.state.temperature}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)
