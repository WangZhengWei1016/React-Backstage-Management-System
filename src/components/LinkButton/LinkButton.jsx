/* 
    自定义的 看似链接 实际是button的组件

    1. {...props} 将接收到的所有属性传递给子标签
    2. 标签属性 children
        - 字符串            <LinkButton>退出</LinkButton>
        - 标签对象          <LinkButton><span></span></LinkButton>
        - 标签对象的数组     <LinkButton><span></span><span></span><span></span></LinkButton>
*/
import React from 'react';

import './LinkButton.less';

export default function LinkButton (props) {
    return <button className='link-button' {...props}/>
}