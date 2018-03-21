import { USERINFO,TOLOGIN } from './action-types';


let dafaultState = {
    userInfo: {}
};


// 当前用户信息
export const currentUserInfo= (userInfo = dafaultState.userInfo, action)=> {
    switch (action.type) {
    case USERINFO:
        return action.user;
    case TOLOGIN:
        return action.user;
    default:
        return userInfo;
    }
};