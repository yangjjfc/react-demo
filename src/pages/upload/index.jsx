import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Upload, Icon, message } from 'antd';
import $ from 'jquery';
import '@/assets/plugins/boxer/jquery.fs.boxer.css';
import {boxer} from '@/assets/plugins/boxer/jquery.fs.boxer.js';
class PicturesWall extends Component {
    static PropTypes={
        listType: PropTypes.string,
        fileList: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),

    }
    static defaultProps = {
        listType: 'picture-card',
        maxLength: 3,
        fileList: 's3/M00/00/04/rB4r9Fqg8o6AIF98AAB6xu5zodI651.png'
    };
    constructor (props) {
        super(props);
        this.state = {
            action: process.env.REACT_APP_IMAGE_UPLOAD,
            headers: {},
            previewImage: '',
            fileList: []
        };
    }
    componentWillMount () {
        let {fileList,userInfo}=this.props;
        this.setState({
            headers: {
                jtoken: userInfo.token
            }
        });
        let file=typeof fileList ==='string'? fileList.split(','):(fileList instanceof Array ?fileList:null);
        file&&file.length&&this.formatPic(file);
    }
    componentDidMount () {
        $(this.boxer).boxer();
    }
    formatPic (file) {
        let formatFile=file.map((item,index)=> ({
            uid: Math.random() * 1000000000,
            status: 'done',
            name: 'xxx.png',
            url: process.env.REACT_APP_IMAGE_DOWNLOAD+item
        }));
        this.setState({
            fileList: formatFile
        });
    }
    beforeUpload (file, fileList) {
        console.log(file, fileList);
        if(!this.getFileType(file.name)) {
            message.error('文件类型不支持',4);
            return false;
        }
        if (file.size > 5*1024*1024) {
            message.error('文件大小不能超过 5MB',4);
            return false;
        }
    }
    handleCancel () {
        this.setState({ previewVisible: false });
    }
    handlePreview (file) {
        console.log(file);
        this.setState({
            previewImage: file.url || file.thumbUrl,
        },()=>{
            this.boxer.click();
        });
    }
    handleChange ({ file,fileList }) {
        console.log('1312312',file);
        if(file.status) {
            this.setState({ fileList });
        }
    }
    handleRemove (file) {
        console.log(file);
    }
   
    getFileType (item)  {
    // 判断是否是图片
        let strFilter = ['jpeg', 'jpg', 'png', 'pic', 'bmp', 'gif'];
        let strPostfix;
        if (!item) {
            return null;
        }
        if (item.indexOf('.') > -1) {
            strPostfix = item.split('.').pop().toLowerCase();
            if (~strFilter.indexOf(strPostfix)) {
                return 'image';
            } else if (~['pdf'].indexOf(strPostfix)) {
                return 'pdf';
            } else {
                return false; // 不支持的文件类型
            }
        }
        return null;
    }
    render () {
        const { action,headers, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action={action}
                    headers={headers}
                    listType={this.props.listType}
                    fileList={fileList}
                    beforeUpload={this.beforeUpload.bind(this)}
                    onPreview={this.handlePreview.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    onRemove={this.handleRemove.bind(this)}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <a href={previewImage}  ref={(c) => { this.boxer = c; }} className="boxer" style={{'display': 'none'}}>img</a>
            </div>
        );
    }
   
}

const mapStateToProps=(state)=> ({
    userInfo: state.currentUserInfo
});
const mapDispatchToProps= (dispatch)=> ({
});
export default connect(mapStateToProps,mapDispatchToProps)(PicturesWall);