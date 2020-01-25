/* 
    商品详情组件
*/
import React, { Component } from 'react'
import { Card, List, Icon } from "antd"

import LinkButton from '../../components/LinkButton/LinkButton'
import memoryUtils from "../../utils/memoryUtils"
import { IMG_BASE_URL } from "../../utils/constants"
import { reqCategory, reqProduct } from '../../api'

const { Item } = List

export default class ProductDetail extends Component {

    state = {
        categoryName: '',
        product: memoryUtils.product,
        isLoading: false
    }

    getCategory = async (categoryId) => {
        this.setState({isLoading: true})
        const result = await reqCategory(categoryId)
        this.setState({isLoading: false})
        if (result.status === 0) {
            const categoryName = result.data.name

            this.setState({categoryName})
        }
    }

    getProduct = async (productId) => {
        this.setState({isLoading: true})
        const result = await reqProduct(productId)
        this.setState({isLoading: false})
        const product = result.data
        this.setState({product})

        // 刷新时，根据商品id获取商品分类
        this.getCategory(product.categoryId)
    }

    async componentDidMount() {
        // 第一次点击详情时，需根据memoryUtils中的product._id获取商品分类
        const { product } = memoryUtils
        if (product._id) {
            this.getCategory(product.categoryId)
        }

        // 如果当前product状态中没有数据，根据params参数id请求获取商品并更新
        if (!this.state.product._id) {
            const { id } = this.props.match.params
            this.getProduct(id)
        }
    }

    render() {

        const { categoryName, product, isLoading } = this.state

        const title = (
            <span>
                <LinkButton onClick={() => {this.props.history.goBack()}}>
                    <Icon type='arrow-left'/>
                </LinkButton>
                <span>商品详情</span>
            </span>
        )
        
        return (
            <Card
                title={title}
                className='detail'
                bordered={false}
            >
                <List loading={isLoading}>
                    <Item>
                        <span className='detail-left'>商品名称：</span>
                        <span>{product.name}</span>
                    </Item>
                    <Item>
                        <span className='detail-left'>商品描述：</span>
                        <span>{product.desc}</span>
                    </Item>
                    <Item>
                        <span className='detail-left'>商品价格：</span>
                        <span>{product.price}</span>
                    </Item>
                    <Item>
                        <span className='detail-left'>所属分类：</span>
                        <span>{categoryName}</span>
                    </Item>
                    <Item>
                        <span className='detail-left'>商品图片：</span>
                        {
                            product.imgs && product.imgs.map(item => <img key={item} className='detail-right-img' src={IMG_BASE_URL + item} alt=""/>)
                        }
                    </Item>
                    <Item>
                        <span className='detail-left'>商品详情：</span>
                        <span className='detail-right-product' dangerouslySetInnerHTML={{__html: product.detail}}></span>
                    </Item>
                </List>
            </Card>
        )
    }
}
