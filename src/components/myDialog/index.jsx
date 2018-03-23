import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

class Dialog extends Component {
     static defaultProps = {
         destroyOnClose: true,// 关闭时销毁 Modal 里的子元素
     };
    handleOk = (e) => {
        console.log(e);
        this.props.submitCallback();
    }
    handleCancel = (e) => {
        console.log(e);
        this.props.submitCallback();
    }
    render () {
        return (
            <div>
                <Modal
                    {...this.props}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {this.props.children}
                </Modal>
            </div>
        );
    }
}

export default Dialog;
