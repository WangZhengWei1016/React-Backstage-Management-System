import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

import memoryUtils from '../../utils/memoryUtils'

export default class Admin extends Component {
    render() {
        
        // 读取localStorage中保存的user_key，如果不存在，则直接跳转到登录界面
        // const user = JSON.parse(localStorage.getItem('user_key') || '{}')
        const user = memoryUtils.user
        if (!user._id) {
            return <Redirect to="/login" />
        }

        return (
            <div>
                HELLO，{user.username}
            </div>
        )
    }
}
