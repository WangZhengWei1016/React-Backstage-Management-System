/* 
    商品分类
*/
import React, { Component } from 'react'
import { Card, Icon, Button, Table, message, Modal } from 'antd'

import LinkButton from '../../components/LinkButton/LinkButton'
import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api'
import AddUpdateForm from './AddUpdateForm'
import { PAGE_SIZE } from '../../utils/constants'

export default class Category extends Component {

    state = {
        categorys: [],
        loading: false,
        showStatus: 0 // 对话框的显示状态 0表示隐藏，1表示显示添加，2表示显示修改
    }

    /* 
        初始化table所有列信息的数组
    */
    initColumns = () => {
        this.columns = [
            {
                title: '商品分类',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 500,
                render: (category) => <LinkButton onClick={() => {
                    this.setState({showStatus: 2})
                    // 保存当前分类
                    this.category = category
                }}>修改分类</LinkButton>
            }
        ]
    }
    
    /* 
        初始化table所有列信息的数组
    */
    getCategorys = async () => {
        // 显示loading
        this.setState({loading: true})
        // 异步发送ajax请求
        let result = await reqCategorys()
        // 隐藏loading
        this.setState({loading: false})
        if (result.status === 0) {
            // 取出分类列表
            const categorys = result.data
            // 更新状态categorys数据
            this.setState({
                categorys
            })
        } else {
            message.error('获取分类列表失败')
        }
    }

    /* 
        点击确认的回调，去添加/修改
    */
    handleOk = () => {

        // 进行表单验证
        this.form.validateFields(async (err, values) => {
            if (!err) {                
                
                // 验证通过后，得到输入的数据
                const { categoryName } = values

                const { showStatus } = this.state
                let result
                if (showStatus === 1) { // 添加
                    // 发送添加分类的请求
                    result = await reqAddCategory(categoryName)
                } else { // 修改
                    const categoryId = this.category._id
                    // 发送修改分类的请求
                    result = await reqUpdateCategory({categoryId, categoryName})
                }
                
                this.form.resetFields() // 重置输入数据，变成了初始值
                
                this.setState({showStatus: 0})

                const action = showStatus === 1 ? '添加' : '修改'
                // 根据响应结果不同，做出相应处理
                if (result.status === 0) {
                    message.success(action + '分类成功')

                    // 重新获取分类列表显示
                    this.getCategorys()
                } else {
                    message.error(action + '分类失败')
                }
            } else {
                message.error('添加失败，请按要求填写')
            }
        })
    }

    /* 
        点击取消的回调
    */
    handleCancel = () => {
        this.form.resetFields()
        this.setState({
            showStatus: 0
        })
    }


    UNSAFE_componentWillMount () {
        this.initColumns()
    }

    componentDidMount () {
        this.getCategorys()
    }


    render() {

        const extra = (
            <Button type='primary' onClick={() => {
                    this.category = null
                    this.setState({showStatus: 1})
                }}>
                <Icon type='plus' />
                添加
            </Button>  
        )
        

        // 取出state中的数据
        const {categorys, loading, showStatus} = this.state
        
        const category = this.category || {}

        return (
            <Card bordered={false} extra={extra}>
                <Table
                    bordered
                    rowKey='_id'
                    columns={this.columns}
                    dataSource={categorys}
                    loading={loading}
                    pagination={{defaultPageSize: PAGE_SIZE, showQuickJumper: true}}
                />
                <Modal
                    title={showStatus === 1 ? '添加分类' : '修改分类'}
                    visible={showStatus !== 0}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {/* 将子组件传递过来的form保存到当前组件对象上 */}
                    <AddUpdateForm setForm={form => this.form = form} categoryName={category.name} />
                </Modal>
            </Card>
        )
    }
}
