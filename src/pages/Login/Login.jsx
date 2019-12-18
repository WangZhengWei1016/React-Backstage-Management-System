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
                        <Form.Item>
                            {
                                getFieldDecorator('username', {
                                    rules: [{}]
                                })(
                                    <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    rules: [{}]
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
