/* 
    角色管理
*/
import React, { Component } from 'react'
import {  Card, Button, Icon, Table, Modal, message } from 'antd'

import LinkButton from '../../components/LinkButton/LinkButton'
import { PAGE_SIZE } from '../../utils/constants'
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api'
import formateDate from '../../utils/dateFormate'
import AddForm from './AddForm'
import SetAuthority from './SetAuthority'
import memoryUtils from '../../utils/memoryUtils'

export default class Role extends Component {

    state = {
        roles: [],
        isLoading: false,
        addRoleVisible: false, // 添加角色对话框的显示状态
        setAuthorityVisible: false // 设置权限对话框的显示状态
    }

    setAuthorityRef = React.createRef()

    /* 
        初始化标题显示
    */
    initColumns = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
                width: 200
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                // render: (create_time) => formateDate(create_time),
                render: formateDate
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                // render: (auth_time) => formateDate(auth_time),
                render: formateDate
            },
            {
                title: '授权人',
                dataIndex: 'auth_name'
            },
            {
                title: '操作',
                render: (role) => (
                    <LinkButton
                        onClick={() => {
                            this.setState({setAuthorityVisible: true})
                            this.role = role
                        }}
                    >
                        设置权限
                    </LinkButton>
                )
            }
        ]
    }

    /* 
        初始化数组roles，获取角色列表
    */
    getRoles = async () => {
        this.setState({isLoading: true})

        const result = await reqRoles()

        this.setState({isLoading: false})
        if (result.status === 0) {
            const roles = result.data
            this.setState({roles})
        } else {
            message.error('获取角色列表失败')
        }
    }

    /* 
        点击确认的回调，去添加角色
    */
   addRoleHandleOk = () => {
        this.form.validateFields(async (err, value) => {
            if (!err) {
                const {roleName} = value
                const result = await reqAddRole(roleName)

                if (result.status === 0) {
                    message.success('角色添加成功')
                    this.getRoles()

                    this.setState({addRoleVisible: false})
                    this.form.resetFields()
                } else {
                    message.error(result.msg)
                }
            } else {
                message.error('添加失败，请按要求填写')
            }
        })
    }

    addRoleHandleCancel = () => {
        this.form.resetFields()
        this.setState({addRoleVisible: false})
    }

    setAuthorityHandleOk = async () => {

        // 更新role
        const { role } = this
        role.menus = this.setAuthorityRef.current.getMenus()
        role.auth_time = Date.now()
        role.auth_name = memoryUtils.user.username

        
        const result = await reqUpdateRole(role)

        if (result.status === 0) {
            message.success('角色权限设置成功')
            this.getRoles()

            this.setState({setAuthorityVisible: false})
        } else {
            message.error(result.msg)
        }
    }

    setAuthorityHandleCancel = () => {
        this.setState({setAuthorityVisible: false})
    }

    UNSAFE_componentWillMount() {
        // 初始化标题显示
        this.initColumns()
    }

    componentDidMount() {
        // 获取角色列表
        this.getRoles()
    }

    render() {

        const extra = (
            <Button
                type='primary'
                onClick={() => {
                    this.setState({addRoleVisible: true})
                }}
            >
                <Icon type='plus' />
                创建角色
            </Button>
        )
        
        const { roles, isLoading, addRoleVisible, setAuthorityVisible } = this.state

        return (
            <Card
                extra={extra}
                bordered={false}
            >
                <Table
                    bordered
                    columns={this.columns}
                    dataSource={roles}
                    rowKey='_id'
                    loading={isLoading}
                    pagination={{defaultPageSize: PAGE_SIZE, showQuickJumper: true}}
                >
                </Table>
                <Modal
                    title="添加角色"
                    visible={addRoleVisible}
                    onOk={this.addRoleHandleOk}
                    onCancel={this.addRoleHandleCancel}
                >
                    <AddForm setForm={form => this.form = form} />
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={setAuthorityVisible}
                    onOk={this.setAuthorityHandleOk}
                    onCancel={this.setAuthorityHandleCancel}
                >
                    <SetAuthority ref={this.setAuthorityRef} role={this.role} />
                </Modal>
            </Card>
        )
    }
}
