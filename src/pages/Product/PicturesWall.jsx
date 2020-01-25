import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, Modal, message } from 'antd'

import { reqDeleteImg } from '../../api';
import { IMG_BASE_URL } from '../../utils/constants'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

export default class PicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    }

    static propTypes = {
        imgs: PropTypes.array
    }

    /* 
        获取商品图片名数组
    */
    getImgsNameList = () => this.state.fileList.map(file => file.name)

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        })
    }

    /* 
        file的状态发生改变时的监听回调
        file： 当前操作（上传/删除）的file
    */
    handleChange = async ({ file, fileList }) => {
        // file 与 fileList中的最后一个file 指的是同一张图片，但是是不同的对象
        // console.log(fileList, file, file === fileList[fileList.length - 1])
        // 如果上传成功
        if (file.status === 'done') {
            message.success('图片上传成功')
            file = fileList[fileList.length - 1]
            // 取出相应数据中的图片文件名name和地址url
            const {name, url} = file.response.data
            // 保存到上传的file上
            file.name = name
            file.url = url
        } else if (file.status === 'removed') {
            const result = await reqDeleteImg(file.name)
            if (result.status === 0) {
                message.success('图片删除成功')
            } else {
                message.error('图片删除失败')
            }
        }
        this.setState({ fileList })
    }

    UNSAFE_componentWillMount() {
        /* 
            根据传入的imgs生成fileList并更新
        */
        const { imgs } = this.props
        if (imgs && imgs.length > 0) {
            const fileList = imgs.map((img, index) => ({
                uid: -index,
                name: img,
                status: 'done',
                url: IMG_BASE_URL + img
            }))
            this.setState({fileList})
        }
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state
        const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
        )
        return (
        <div>
            <Upload
                action="/manage/img/upload"
                name='image'
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
        )
    }
}