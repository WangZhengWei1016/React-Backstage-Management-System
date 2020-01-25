/* 
    商品管理首页
*/
import React, { Component } from 'react'
import {
    Card,
    Select,
    Icon,
    Button,
    Input,  
    Table,
    message
} from 'antd'
import throttle from 'lodash.throttle'

import LinkButton from '../../components/LinkButton/LinkButton'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api'
import { PAGE_SIZE } from "../../utils/constants"
import memoryUtils from "../../utils/memoryUtils"

const { Option } = Select

export default class ProductHome extends Component {

    state = {
        
        loading: false,
        products: [],
        total: 0,
        searchType: '',
        searchKeyWords: '',
        productStatus: ''
    }
    
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                width: 200
            },
            {
                title: '商品描述',
                dataIndex: 'desc'
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '￥' + price,
                width: 160
            },
            {
                title: '状态',
                // dataIndex: 'status',
                render: ({status, _id}) => {
                    let btnText = '下架'
                    let text = '在售'
                    if (status === 2) {
                        btnText = '上架'
                        text = '已下架'
                    }
                    return (
                        <span>
                            <Button 
                                onClick={() => {this.updateStatus(status, _id)}}
                                type='primary'
                                style={{marginRight: 10}}
                            >
                                {btnText}
                            </Button>
                            {text}
                        </span>
                    )
                },
                width: 160
            },
            {
                title: '操作',
                render: (product) => (
                    <span>
                        <LinkButton
                            onClick={() => {
                                memoryUtils.product = product
                                this.props.history.push('/product/detail/' + product._id)
                            }}
                        >
                            详情
                        </LinkButton>
                        <LinkButton
                            onClick={() => {
                                memoryUtils.product = product
                                this.props.history.push('/product/addupdate')
                            }}
                        >
                            修改
                        </LinkButton>
                    </span>
                ),
                width: 120,
                align: 'center'
            }
        ]
    }

    getProducts = async (pageNum) => {
        // 保存当页页码
        this.pageNum = pageNum

        const { searchType, searchKeyWords } = this.state
        let result
        if (!searchKeyWords) {
            // 显示loading
            this.setState({loading: true})
            result = await reqProducts(pageNum, PAGE_SIZE)
            // 隐藏loading
            this.setState({loading: false})
        } else {
            // 显示loading
            this.setState({loading: true})
            result = await reqSearchProducts(pageNum, PAGE_SIZE, searchType, searchKeyWords)
            // 隐藏loading
            this.setState({loading: false})
        }
        
        if (result.status === 0) {
            const {total, list} = result.data
            this.setState({
                products: list,
                total
            })
        }
    }

    updateStatus = throttle(async (status, productId) => {
        // 更新商品的status
        status = status === 1 ? 2 : 1
        const result = await reqUpdateStatus(status, productId)

        if (result.status === 0) {
            message.success('商品状态更新成功')
            // 重新获取当页数据
            this.getProducts(this.pageNum)
        } else {
            message.error('商品状态更新失败，请重试')
        }
    }, 1000)

    UNSAFE_componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getProducts(1)
    }

    render() {
        
        const { loading, products, total} = this.state

        const title = (
            <span>
                <Select
                    style={{width: 200}}
                    placeholder='请选择搜索方式'
                    onChange={(value) => {this.setState({searchType: value})}}
                >
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input 
                    style={{width: 200, margin: '0 10px'}}
                    placeholder='请输入关键字'
                    onChange={(event) => {this.setState({searchKeyWords: event.target.value})}}
                />
                <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
            </span>
        )
        const extra = (
            <Button
                type='primary'
                onClick={() => {
                    memoryUtils.product = {}
                    this.props.history.push('/product/addupdate')
                }}
            >
                <Icon type='plus' />
                添加商品
            </Button>
        )


        return (
            <Card
                title={title}
                extra={extra}
                bordered={false}
            >
                <Table
                    bordered
                    rowKey='_id'
                    columns={this.columns}
                    dataSource={products}
                    loading={loading}
                    pagination={{total, current: this.pageNum, defaultPageSize: PAGE_SIZE, showQuickJumper: true, onChange: this.getProducts}}
                >

                </Table>
            </Card>
        )
    }
}
