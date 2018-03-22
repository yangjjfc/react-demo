import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'; // 注入history到this.props
import { connect } from 'react-redux';
import { getCurrentUser,login} from '@/store/user/actions';
import { encryption } from '~global';
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';
const FormItem = Form.Item; 
const URL = { 
    VERIFY_CODE: '/verifyCode',
};
class NormalLoginForm extends Component {
    constructor (props) {
        super(props);
        this.state={
            authImg: '' // 验证码
        };
        // 规则
        this.rules={
            userName: [
                { required: true, message: '请输入用户名' },
                { pattern: /^[a-zA-Z0-9_-]{4,20}$/,message: '用户名格式不正确',trigger: 'blur'}
            ],
            password: [
                { required: true, message: '请输入密码' },
                { pattern: /^[a-zA-Z0-9_-]{4,20}$/,message: '密码长度6-20个字符',trigger: 'blur'}
            ],
            authCode: [
                { required: true, message: '请输入验证码' },
                { pattern: /^[a-zA-Z0-9]{4}$/,message: '验证码4个字符',trigger: 'blur'}
            ]
        };
    } 
    componentWillMount () {
        this.props.getCurrentUser(); // 获取临时信息
        this.getRandomImg(); 
    }
    // 提交表单
    handleSubmit (e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { history,userInfo,login} = this.props;
                let params={
                    // platform: 'BRP',
                    userName: values.userName,
                    password: encryption(values.password,userInfo.clientId,userInfo.token)
                };
                login(params).then(res=>{
                    console.log('登录成功');
                    history.push('/app',{ url: 'home' });
                });
            }
        });
    } 
    // 获取验证码
    getRandomImg () {
        let authImg = process.env.REACT_APP_SERVER + URL.VERIFY_CODE + '?t=' + Math.round(Math.random() * 1000000);
        this.setState({
            authImg
        });
    }
    render () {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="my-login">
                <Card>
                    <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: this.rules.userName,
                                initialValue: 'yosemite',
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: this.rules.password,
                                initialValue: '123456',
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('authCode', {
                                rules: this.rules.authCode,
                                initialValue: '1234',
                            })(
                                <Input type="text" placeholder="验证码" maxLength="4" className="auth-code" />
                            )}
                            <div className="right auth-right">
                                <img src={this.state.authImg} width="80" height="32" alt="验证码" className="pointer" onClick={this.getRandomImg.bind(this)} /> 
                                <span className="pointer" onClick={this.getRandomImg.bind(this)}>换一张？</span>
                            </div>
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <a className="login-form-forgot" href="">Forgot password</a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
              Or <a href="">register now!</a>
                        </FormItem>
                    </Form>
                </Card >
            </div>
        );
    }
}


const mapStateToProps=(state)=> ({
    userInfo: state.currentUserInfo
});

const mapDispatchToProps= (dispatch)=> ({
    getCurrentUser: (res) => dispatch(getCurrentUser(res)),
    login: (params) => dispatch(login(params))
});

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Form.create()(NormalLoginForm)));