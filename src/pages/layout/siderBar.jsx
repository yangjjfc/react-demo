import React, { Component } from 'react';
import Table from '@/pages/table';
import Login from '@/pages/login/index';
import upload from '@/pages/upload/index';
import {withRouter} from 'react-router-dom';
import MyDialog from '@/components/myDialog';
import { Layout, Menu, Icon,Button  } from 'antd';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

class SiderBar extends Component {
  state = {
      collapsed: false,
      dialog: {
          visible: false,
          title: 'this is title'
      }
  };
  toggle = () => {
      this.setState({
          collapsed: !this.state.collapsed,
         
      });
  }
  menuSelect ({ item, key, selectedKeys }) {
      console.log(key);
      console.log(this.props.history);
      //   this.props.history
      this.props.history.push(`/app/${key}`);
  }
  handleClick =()=> {
      this.setState(prevState => ({
          dialog: {...prevState.dialog,visible: true},
      }));
  }
  submit=()=>{
      this.setState(prevState => ({
          dialog: {...prevState.dialog,visible: false},
      }));
  }
  render () {
      return (
          <Layout className="layout-main">
              <Sider
                  trigger={null}
                  collapsible
                  collapsed={this.state.collapsed}
              >
                  <div className="logo" />
                  <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onSelect={this.menuSelect.bind(this)}>
                      <Menu.Item key="table">
                          <Icon type="user" />
                          <span>nav 1</span>
                      </Menu.Item>
                      <Menu.Item key="login">
                          <Icon type="video-camera" />
                          <span>nav 2</span>
                      </Menu.Item>
                      <Menu.Item key="upload">
                          <Icon type="upload" />
                          <span>nav 3</span>
                      </Menu.Item>
                  </Menu>
              </Sider>
              <Button type="primary" onClick={this.handleClick}>Vertically centered modal dialog</Button>
              <MyDialog {...this.state.dialog} submitCallback={this.submit}>
                  <p>some contents...</p>
                  <p>some contents...</p>
                  <p>some contents...</p>
              </MyDialog>
              <Layout>
                  <Header style={{ background: '#fff', padding: 0 }}>
                      <Icon
                          className="trigger"
                          type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                          onClick={this.toggle}
                      />
                  </Header>
                  <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                      <Switch>
                          <Route path="/app/table"  component={Table} />
                          <Route path="/app/login"  component={Login} />
                          <Route path="/app/upload"  component={upload} />
                          <Redirect to="/app" />
                      </Switch>
                  </Content>
              </Layout>
          </Layout>
      );
  }
}

export default withRouter(SiderBar);