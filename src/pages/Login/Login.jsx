import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Form, Icon, Input, Button, message } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { login } from '../../redux/actions'
import logo from '../../assets/images/logo.png'
import './Login.less'

class Login extends Component {

    static propTypes = {
        login: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    }

    handleSubmit = e => {
        e.preventDefault();
        // const {getFieldsValue} = this.props.form
        // 获取用户的输入
        // const {username, password} = getFieldsValue()
        // console.log(username, password);
        
        // 统一验证
        this.props.form.validateFields(async (err, {username, password}) => {
            if(!err) {
                this.props.login(username, password)
            }else {
                message.error('请正确输入用户名和密码')
            }
        })

    }

    // 对密码进行 自定义验证
    validatorPwd = (rule, value, callback) => {
        value = value.trim()
        if(!value) {
            callback('密码不能为空')
        }else if(value.length < 4) {
            callback('密码最少为4位')
        }else if(value.length > 12) {
            callback('密码最多为12位')
        }else if(!/^[A-Za-z0-9_]+$/.test(value)) {
            callback('密码只能是字母、数字和下划线或其组合')
        }else {
            callback()
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form
        
        // 读取localStorage中保存的user_key，如果存在，则直接跳转到管理界面
        // const user = JSON.parse(localStorage.getItem('user_key') || '{}')
        const user = this.props.user
        if (user._id) {
            return <Redirect to="/home"/>
        }

        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>Backstage Manegement System</h1>
                </div>
                <div className="login-content">
                    <h1>User Login</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        {/* 用户名 */}
                        <Form.Item>
                            {
                                getFieldDecorator('username', { //对用户名字进行声明式验证
                                    rules: [
                                        {required: true, whitespace: true, message: '用户名是必须的'},
                                        {min: 4, message: '用户名最少为4位'},
                                        {max: 12, message: '用户名最多为12位'},
                                        {pattern: /^[A-Za-z0-9]+$/, message: '用户名只能是字母、数字或其组合'}
                                    ]
                                })(
                                    <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                                    placeholder="Username"
                                    />
                                )
                            }
                        </Form.Item>
                        {/* 密码 */}
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    initialValue: '',
                                    rules: [
                                        {validator: this.validatorPwd}
                                    ]
                                })(
                                    <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password"
                                    placeholder="Password"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit}>
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

const WrapLoginForm = Form.create()(Login)

export default connect(
    state => ({user: state.user}),
    {login}
)(WrapLoginForm)
