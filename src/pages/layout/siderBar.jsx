import React, { Component } from 'react';
import Table from '@/pages/table';
import Login from '@/pages/login/index';
import upload from '@/pages/upload/index';
import {withRouter} from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

class SiderBar extends Component {
  state = {
      collapsed: false,
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