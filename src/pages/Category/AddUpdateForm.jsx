/* 
    添加/修改分类的Form组件
*/
import React, { Component } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'

class AddUpdateForm extends Component {

    static propTypes = {
        setForm: PropTypes.func.isRequired,
        categoryName: PropTypes.string
    }


    UNSAFE_componentWillMount () {
        this.props.setForm(this.props.form)
    }

    render() {

        const { getFieldDecorator } = this.props.form

        const {categoryName} = this.props

        return (
            <Form>
                <Form.Item>
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: categoryName || '',
                            rules: [
                                {required: true, message: '商品类名必须输入'}
                            ]
                        })(
                            <Input placeholder='请输入商品分类名' />
                        )
                    }
                </Form.Item>
            </Form>  
        )
    }
}

export default Form.create()(AddUpdateForm)
