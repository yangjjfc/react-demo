import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';
const FormItem = Form.Item; 

class NormalLoginForm extends Component {
    constructor (props) {
        super(props);
        this.state={
            userName: 'scm_dajyb',
            password: '123456',
            verification: '1234'
        };
    } 
  handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.props.form.getFieldsValue());
      this.props.form.validateFields((err, values) => {
          if (!err) {
              console.log('Received values of form: ', values);
          }
      });
  } 
  render () {
      console.log(this.props);
      const { getFieldDecorator } = this.props.form;
      return (
          <div className="my-login">
              <Card>
                  <Form onSubmit={this.handleSubmit} className="login-form">
                      <FormItem>
                          {getFieldDecorator('userName', {
                              rules: [{ required: true, message: 'Please input your username!' }],
                          })(
                              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} defaultValue={this.state.userName} placeholder="Username" />
                          )}
                      </FormItem>
                      <FormItem>
                          {getFieldDecorator('password', {
                              rules: [{ required: true, message: 'Please input your Password!' }],
                          })(
                              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                          )}
                      </FormItem>
                      <FormItem>
                          {getFieldDecorator('valy', {
                              rules: [{ required: true, message: 'Please input your Password!' }],
                          })(
                              <Input type="text" placeholder="valy" className="valy" />
                          )}
                          <div className="right">
                              <img src="12" width="80" height="30" />
                              {/* <a href="javascript:void(0)">换一张？</a> */}
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

export default  Form.create()(NormalLoginForm);
