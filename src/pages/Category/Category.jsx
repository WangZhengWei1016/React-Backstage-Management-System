/* 
    商品分类
*/
import React, { Component } from 'react'
import { Card, Icon, Button, Table } from 'antd'

import LinkButton from '../../components/LinkButton/LinkButton'

export default class Category extends Component {

    render() {

        const extra = (
            <Button type='primary'>
                <Icon type='plus' />
                添加
            </Button>  
        )


        const columns = [
            {
                title: '商品分类',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: () => <LinkButton>修改分类</LinkButton>
            },
            {
                title: '删除',
                width: 300,
                render: () => <LinkButton>删除</LinkButton>
            },
        ]
        const data = [
            {
                key: '1',
                name: 'John Brown',
                money: '￥300,000.00',
                address: 'New York No. 1 Lake Park',
            },
            {
                key: '2',
                name: 'Jim Green',
                money: '￥1,256,000.00',
                address: 'London No. 1 Lake Park',
            },
            {
                key: '3',
                name: 'Joe Black',
                money: '￥120,000.00',
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '4',
                name: 'Joe Black',
                money: '￥120,000.00',
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '5',
                name: 'Joe Black',
                money: '￥120,000.00',
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '6',
                name: 'Joe Black',
                money: '￥120,000.00',
                address: 'Sidney No. 1 Lake Park',
            },
        ]

        return (
            <Card bordered={true} extra={extra}>
                <Table
                    bordered
                    columns={columns}
                    dataSource={data}
                    pagination={{defaultPageSize: 5, showQuickJumper: true}}
                />
            </Card>
        )
    }
}
