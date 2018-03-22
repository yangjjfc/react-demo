import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { getroles } from '@/store/user/actions';
import SiderBar from './siderBar';
import Login from '@/pages/login/index';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import './App.scss';
class App extends Component {
  
    async componentWillMount () {
        let {roles}=this.props.state;
        if (!roles.length) {
            let res= await this.props.getroles();
            roles=res.data.permissionSet;
        }
        
    }
    render () {
        return (
            <div id="content-main">
                <SiderBar />
                {/* <BrowserRouter>
                    <Switch>
                        <Route path="/login" exact component={Login} />
                        <Redirect to="/login" />
                    </Switch>
                </BrowserRouter> */}
            </div>
        );
    }
}

const mapStateToProps=(state)=> ({
    state
});

const mapDispatchToProps= (dispatch)=> ({
    getroles: (res) => dispatch(getroles(res))
});

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(App));