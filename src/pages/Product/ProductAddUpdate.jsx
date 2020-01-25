/* 
    添加/修改商品组件
*/
import React, { Component } from 'react'
import { Card, Icon, Form, Select, Input, Button, message } from "antd"

import PicturesWall from './PicturesWall'
import LinkButton from '../../components/LinkButton/LinkButton'
import { reqCategorys, reqAddOrUpdateProduct } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import RichTextEditer from "./RichTextEditer"

const { Item } = Form
const { Option } = Select

class ProductAddUpdate extends Component {

    state = {
        categorys: []
    }

    PicturesWallRef = React.createRef()
    richTextEditerRef = React.createRef()

    getCategorys = async () => {
        const result = await reqCategorys()        
        if (result.status === 0) {
            const categorys = result.data
            this.setState({categorys})
        }
    }

    /* 
        对价格进行自定义验证
    */
    validatePrice = (rule, value, callback) => {
        if (value === '') {
            callback()
        } else if (value * 1 <= 0) {
            callback('商品价格必须大于0')
        } else {
            callback()
        }
    }

    /* 
        对表单进行统一验证
    */
    handelSubmit = (e) => {
        // 取消默认行为
        e.preventDefault()
        this.props.form.validateFields(async (err, values) => {
            const {name, desc, price, categoryId} = values
            if (!err) {
                // 上传图片文件名的数组
                const imgs = this.PicturesWallRef.current.getImgsNameList()

                console.log(name, desc, price, categoryId, imgs)
                // 输入的商品详情的标签字符串
                const detail = this.richTextEditerRef.current.getDetail()
                
                // 封装product
                const product = {categoryId, name, desc, price, detail, imgs}
                if (this.isUpdate) {
                    product._id = this.product._id
                }

                // 发送请求添加或修改
                const result = await reqAddOrUpdateProduct(product)

                if (result.status === 0) {
                    message.success(`商品${this.isUpdate ? '修改' : '添加'}成功`)
                    this.props.history.replace('/product')
                } else {
                    message.error(`${(this.isUpdate ? '修改' : '添加')}失败，${result.msg}`)
                }
                
            } else {
                message.error('添加失败，请按要求输入')
            }
        })
    }

    UNSAFE_componentWillMount() {
        this.product = memoryUtils.product
        this.isUpdate = !!this.product._id
    }

    componentDidMount() {
        this.getCategorys()
    }

    render() {

        const { categorys } = this.state
        const { getFieldDecorator } = this.props.form
        const { product, isUpdate } = this

        const title = (
            <span>
                <LinkButton onClick={() => {this.props.history.goBack()}}>
                    <Icon type='arrow-left'/>
                </LinkButton>
                <span>{isUpdate ? '修改商品' : '添加商品'}</span>
            </span>
        )
        
        // 表单布局配置对象
        const formLayout = {
            labelCol: {span: 2},
            wrapperCol: {span: 8}
        }

        return (
            <Card
                title={title}
                bordered={false}
            >
                <Form {...formLayout} onSubmit={this.handelSubmit}>
                    <Item label='商品名称'>
                        {
                            getFieldDecorator('name', {
                                initialValue: product.name,
                                rules: [
                                    {required: true, message: '商品名称必须输入'}
                                ]
                            })(<Input placeholder='商品名称' />)
                        }
                    </Item>
                    <Item label='商品描述'>
                        {
                            getFieldDecorator('desc', {
                                initialValue: product.desc,
                                rules: [
                                    {required: true, message: '商品描述必须输入'}
                                ]
                            })(<Input placeholder='商品描述' />)
                        }
                    </Item>
                    <Item label='商品价格'>
                        {
                            getFieldDecorator('price', {
                                initialValue: product.price,
                                rules: [
                                    {required: true, message: '商品价格必须输入'},
                                    {validator: this.validatePrice}
                                ]
                            })(<Input type='number' placeholder='商品价格' addonAfter='元' />)
                        }
                    </Item>
                    <Item label='商品分类'>
                        {
                            getFieldDecorator('categoryId', {
                                initialValue: product.categoryId,
                                rules: [
                                    {required: true, message: '商品分类必须选择'}
                                ]
                            })(
                                <Select placeholder='请选择分类'>
                                    <Option value=''>未选择</Option>
                                    {
                                        categorys.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)
                                    }
                                </Select>
                            )
                        }
                    </Item>
                    <Item label='商品图片' wrapperCol={{span: 10}}>
                        <PicturesWall ref={this.PicturesWallRef} imgs={product.imgs} />
                    </Item>
                    <Item label='商品详情' wrapperCol={{span: 20}}>
                        <RichTextEditer ref={this.richTextEditerRef} detail={product.detail} />
                    </Item>
                    <Item>
                        <Button type='primary' htmlType='submit'>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(ProductAddUpdate)
