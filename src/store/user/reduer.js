import { USERINFO,TOLOGIN,GETROLES } from './action-types';


let dafaultState = {
    userInfo: JSON.parse(window.sessionStorage.getItem('action.user'))||{}   ,
    roles: []
};


// 当前用户信息
export const currentUserInfo= (userInfo = dafaultState.userInfo, action)=> {
    switch (action.type) {
    case USERINFO:
        window.sessionStorage.setItem('action.user',JSON.stringify(action.user));        
        return action.user;
    case TOLOGIN:
        window.sessionStorage.setItem('action.user',JSON.stringify(action.user));          
        return action.user;
    default:
        return userInfo;
    }
};
// 权限
export const roles= (roles = dafaultState.roles, action)=> {
    switch (action.type) {
    case GETROLES:
        return action.roles;
    default:
        return roles;
    }
};