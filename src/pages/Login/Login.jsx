import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';

import logo from './images/logo.png'
import './Login.less'

class Login extends Component {

    handleSubmit = e => {
        e.preventDefault();
        const {getFieldsValue} = this.props.form

        const {username, password} = getFieldsValue()
        console.log(username, password);
        
    }    

    render() {
        const {getFieldDecorator} = this.props.form
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
                                getFieldDecorator('username', {
                                    rules: [
                                        {required: true, whitespace: true, message: '用户名是必须的'},
                                        {min: 4, message: '用户名最少为4位'},
                                        {max: 12, message: '用户名最多为12位'},
                                        {pattern: /^[A-Za-z0-9]+$/, message: '用户名只能是字母、数字和下划线或其组合'}
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
                                    rules: [
                                        {required: true, whitespace: true, message: '密码是必须的'},
                                        {min: 4, message: '密码最少为4位'},
                                        {max: 12, message: '密码最多为12位'},
                                        {pattern: /^[A-Za-z0-9]+$/, message: '密码只能是字母、数字和下划线或其组合'}
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

export default WrapLoginForm
