import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Tree, Form, Input } from 'antd'

import menuList from '../../config/menuConfig'

const { TreeNode } = Tree
const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20}
}

export default class SetAuthority extends Component {

    static propTypes = {
        role: PropTypes.object
    }

    state = {
        checkedKeys: []
    }

    /* 
        map + 递归
    */
    /* getTreeNodes = (menuList) => {
        return menuList.map((item, index) => {
            if (!item.children) {
                return <TreeNode title={item.title} key={item.key} />
            } else {
                return (
                    <TreeNode title={item.title} key={item.key}>
                        {
                            this.getTreeNodes(item.children)
                        }
                    </TreeNode>
                )
            }
        })
    } */
    
    /* 
        reduce + 递归
    */
    getTreeNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {
                        item.children ? this.getTreeNodes(item.children) : null
                    }
                </TreeNode>
            )
            return pre
        }, [])
    }

    /* 
        进行勾选操作的回调
        形参checkedKeys：最新的所有勾选的node的key的数组
    */
    handleCheck = (checkedKeys) => {
        this.setState({checkedKeys})
    }

    getMenus = () => this.state.checkedKeys

    UNSAFE_componentWillMount() {
        this.treeNodes = this.getTreeNodes(menuList)

        // 根据传入的role.menus更新checkedKeys
        const checkedKeys = this.props.role.menus
        this.setState({checkedKeys})
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const checkedKeys = nextProps.role.menus
        this.setState({checkedKeys})
    }
    
    render() {

        const { role } = this.props

        const { checkedKeys } = this.state

        return (
            <div>
                <Form.Item
                    label='角色名称'
                    {...formItemLayout}
                >
                    <Input disabled value={role.name}/>
                </Form.Item>
                <Tree
                    checkable
                    defaultExpandAll
                    checkedKeys={checkedKeys}
                    onCheck={this.handleCheck}
                >
                    <TreeNode title="平台权限" key="AllAuthority">
                        {
                            this.treeNodes
                        }
                    </TreeNode>
                </Tree>
            </div>
        )
    }

}