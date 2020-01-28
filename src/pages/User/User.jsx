/* 
    用户管理
 */
import React, { Component } from 'react'
import { Card, Table, Button, Icon, message, Modal } from 'antd'

import LinkButton from '../../components/LinkButton/LinkButton'
import { reqUsers } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
import AddUpdateForm from './AddUpdateForm'
import dateFormate from '../../utils/dateFormate'
import { reqAddOrUpdateUser, reqDeleteUser } from '../../api'

const { confirm } = Modal

export default class User extends Component {

    state = {
        users: [],
        roles: [],
        isLoading: false,
        visible: false
    }

    initColumns = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '邮箱',
                dataIndex: 'email'
            },
            {
                title: '电话',
                dataIndex: 'phone'
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: dateFormate
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render: (role_id) => this.roleIdNameObj[role_id].name
            },
            {
                title: '操作',
                render: (user) => (
                    <div>
                        <LinkButton
                            onClick={() => {
                                this.user = user
                                this.setState({visible: true})
                            }}
                        >
                            修改
                        </LinkButton>
                        <LinkButton
                            onClick={() => this.handleDelete(user)}
                        >
                            删除
                        </LinkButton>
                    </div>
                )
            },
        ]
    }

    getUsers = async () => {
        this.setState({isLoading: true})
        const result = await reqUsers()
        this.setState({isLoading: false})
        if (result.status === 0) {
            const { users, roles } = result.data


            // 生成一个容器对象(属性名： 角色的id值，属性值：角色的名称)
            this.roleIdNameObj = roles.reduce((pre, role) => {
                pre[role._id] = role
                return pre
            },{})
            
            this.setState({
                users,
                roles
            })
        } else {
            message.error('获取用户列表失败')
        }
    }

    handleOk = () => {
        this.form.validateFields(async (errors, values) => {
            if (!errors) {
                this.setState({visible: false})

                if (this.user) {
                    values._id = this.user._id
                }
                const result = await reqAddOrUpdateUser(values)
                if (result.status === 0) {
                    this.getUsers()
                    message.success('用户' + (this.user ? '修改' : '添加') + '成功')
                } else {
                    message.error(result.msg)
                }
            } else {
                message.error('请按要求输入')
            }
        })
        this.form.resetFields()
    }

    handleCancel = () => {
        this.setState({visible: false})
        this.form.resetFields()
    }

    handleDelete = (user) => {
        confirm({
            title: `确定删除${user.username}的信息吗?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                const result = await reqDeleteUser(user._id)
                if (result.status === 0) {
                    this.getUsers()
                    message.success('删除成功')
                } else {
                    message.error('删除失败')
                }
            },
            onCancel() {
              console.log('Cancel')
            }
          })
    }

    UNSAFE_componentWillMount () {
        this.initColumns()
    }

    componentDidMount() {
        this.getUsers()
    }

    render() {

        // console.log('User render()')

        const { users, roles, isLoading, visible } = this.state
        const user = this.user || {}

        const extra = (
            <Button type='primary'
                onClick={() => {
                    this.user = null
                    this.setState({visible: true})
                }}
            >
                <Icon type='plus' />
                创建用户
            </Button>
        )

        return (
            <Card
                bordered={false}
                extra={extra}
            >
                <Table
                    bordered
                    columns={this.columns}
                    dataSource={users}
                    rowKey='_id'
                    loading={isLoading}
                    pagination={{defaultPageSize: PAGE_SIZE, showQuickJumper: true}}
                >

                </Table>
                <Modal
                    title={`${user._id ? '修改' : '添加'}用户`}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    visible={visible}
                >
                    <AddUpdateForm
                        user={user}
                        roles={roles}
                        setForm={(form) => this.form = form}
                    />
                </Modal>
            </Card>
        )
    }
}
