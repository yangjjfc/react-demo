import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import app from '@/pages/layout/App';
import Login from '@/pages/login/index';
// const _import = require('./_import');
// const app=_import('/layout/App')

console.log(process.env.NODE_ENV);


// react-router4 不再推荐将所有路由规则放在同一个地方集中式路由，子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活
export default class RouteConfig extends Component {
    render () {
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        );
    }
}