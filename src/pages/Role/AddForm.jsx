import React, { PureComponent } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'

class AddForm extends PureComponent {
    static propTypes = {
        setForm: PropTypes.func.isRequired
    }

    UNSAFE_componentWillMount() {
        this.props.setForm(this.props.form)
    }
    
    render() {
        
        // console.log('AddForm render()')
        const { getFieldDecorator } = this.props.form

        return (
            <Form>
                <Form.Item>
                    {
                        getFieldDecorator('roleName', {
                            initialValue: '',
                            rules: [
                                {required: true, message: '角色名称必须输入'},
                            ]
                        })(
                            <Input placeholder='请输入角色名称' />
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(AddForm)