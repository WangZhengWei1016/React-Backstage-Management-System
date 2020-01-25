import React, {Component} from 'react'
import { Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'

const { Option } = Select

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 18}
}

class AddUpdateForm extends Component {

    static propTypes = {
        user: PropTypes.object,
        roles: PropTypes.array.isRequired,
        setForm: PropTypes.func.isRequired
    }

    UNSAFE_componentWillMount() {
        this.props.setForm(this.props.form)
    }

    render() {

        const { getFieldDecorator } = this.props.form

        const { user } = this.props
        
        return (
            <Form {...formItemLayout}>
                <Form.Item label='用户名'>
                    {
                        getFieldDecorator('username', {
                            initialValue: user.username,
                            rules: [
                                {required: true, whitespace: true, message: '用户名是必须的'},
                                {min: 4, message: '用户名最少为4位'},
                                {max: 12, message: '用户名最多为12位'},
                                {pattern: /^[A-Za-z0-9]+$/, message: '用户名只能是字母、数字和下划线或其组合'}
                            ]
                        })(<Input placeholder='请输入用户名'/>)
                    }
                </Form.Item>
                {
                    user._id ? null : (
                        <Form.Item label='密码'>
                            {
                                getFieldDecorator('password', {
                                    initialValue: user.password,
                                    rules: [
                                        {required: true, whitespace: true, message: '密码是必须的'},
                                        {min: 4, message: '密码最少为4位'},
                                        {max: 12, message: '密码最多为12位'},
                                        {pattern: /^[A-Za-z0-9_]+$/, message: '密码只能是字母、数字和下划线或其组合'}
                                    ]
                                })(<Input type='password' placeholder='请输入密码'/>)
                            }
                        </Form.Item>
                    )
                }
                <Form.Item label='手机号'>
                    {
                        getFieldDecorator('phone', {
                            initialValue: user.phone,
                            rules: [
                                {required: true, whitespace: true, message: '手机号是必须的'},
                                {pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '请输入正确的手机号'}
                            ]
                        })(<Input placeholder='请输入手机号'/>)
                    }
                </Form.Item>
                <Form.Item label='邮箱'>
                    {
                        getFieldDecorator('email', {
                            initialValue: user.email,
                            rules: []
                        })(<Input placeholder='请输入邮箱'/>)
                    }
                </Form.Item>
                <Form.Item label='角色'>
                    {
                        getFieldDecorator('role_id', {
                            initialValue: user.role_id,
                            rules: [
                                {required: true, whitespace: true, message: '用户角色必须选择'},
                            ]
                        })(
                            <Select placeholder='请选择角色'>
                                {
                                    this.props.roles.map((role) => <Option key='role._id' value={role._id}>{role.name}</Option>)
                                }
                            </Select>
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(AddUpdateForm)