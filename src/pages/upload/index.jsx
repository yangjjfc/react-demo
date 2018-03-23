import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Upload, Icon, message } from 'antd';
import {getFileType, formatFile} from '~global'; 
import $ from 'jquery';
import '@/assets/plugins/boxer/jquery.fs.boxer.css';
import '@/assets/plugins/boxer/jquery.fs.boxer.js';
class PicturesWall extends Component {
    // props 类型
    static PropTypes={
        listType: PropTypes.string,
        files: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        getfile: PropTypes.func // 回调函数.获取fileList
    }
    // default props
    static defaultProps = {
        listType: 'picture-card',
        maxLength: 3,
        files: 's3/M00/00/05/rB4r9Fq0avaAOOoWAAM-lgRNguk226.pdf,s3/M00/00/05/rB4r9Vq0bUuADnYTAAvJWuf_16s269.pdf'
    };
    constructor (props) {
        super(props);
        this.state = {
            action: process.env.REACT_APP_IMAGE_UPLOAD,
            headers: {},
            multiple: false,// 不支持多选
            previewImage: '', // 查看src
            fileList: [] // 文件
        };
    }
    componentWillMount () {
        let {files,userInfo}=this.props;
        if(!userInfo.token) {
            message.error('token无法获取',4);  
            return;
        }
        this.setState({
            headers: {
                jtoken: userInfo.token
            }
        });
        let file=typeof files ==='string'? files.split(','):(files instanceof Array ?files:null);
        file&&file.length&&this.formatPic(file);
    }
    componentDidMount () {
        $(this.boxer).boxer();// boxer
    }
    // 格式化图片
    formatPic (file) {
        let fileList=file.map((item,index)=>({
            uid: Math.random() * 1000000000,
            status: 'done',
            name: 'img.png',
            sourceUrl: process.env.REACT_APP_IMAGE_DOWNLOAD+item,
            url: formatFile(item),
            thumbUrl: ''
        }));
        this.setState({
            fileList
        });
    }
    beforeUpload (file, fileList) {
        if(!getFileType(file.name)) {
            message.error('文件类型不支持',4);
            return false;
        }
        if (file.size > 5*1024*1024) {
            message.error('文件大小不能超过 5MB',4);
            return false;
        }
    }
    // 查看大图
    handlePreview (file) {
        this.setState({
            previewImage: file.sourceUrl || file.url || file.thumbUrl,
        },()=>{
            this.boxer.click();
        });
    }
    // 文件改变
    handleChange ({ file,fileList }) {
        console.log(file,fileList);
        if(file.status&& file.status !=='error') {
            if(file.status==='done') {
                fileList.pop();
                file.url=formatFile(file.response.data);
                file.sourceUrl=process.env.REACT_APP_IMAGE_DOWNLOAD+file.response.data;
                fileList.push(file);
            }
            this.setState({ fileList });
        }
    }
    handleRemove (file) {
        console.log(file);
    }
    render () {
        const { action,headers, previewImage, fileList,multiple } = this.state;
        const {maxLength}=this.props;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    multiple={multiple}
                    action={action}
                    headers={headers}
                    listType={this.props.listType}
                    fileList={fileList}
                    beforeUpload={this.beforeUpload.bind(this)}
                    onPreview={this.handlePreview.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    onRemove={this.handleRemove.bind(this)}
                >
                    {fileList.length >= maxLength ? null : uploadButton}
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