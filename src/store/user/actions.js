import Http from '~http';
import { USERINFO,TOLOGIN } from './action-types';

/** 获取用户信息 */
export const getCurrentUser = () => async (dispatch, getState) => {
    const {currentUserInfo}=getState();
    try {
        let res = currentUserInfo.enterpriseNo ? { data: currentUserInfo } : await Http('currentUser', { token: currentUserInfo.token || '' });
        dispatch({
            type: USERINFO,
            user: res.data
        });
    } catch (error) {
        console.error(error);
    }
}; 

/**
 * 登录
 * @param {*参数} params 
 */
export const login = (params) => async (dispatch, getState) => {
    try {
        let  res = await Http('login',params);
        dispatch({
            type: TOLOGIN,
            user: res.data
        });
        return res;
    } catch (error) {
        console.error(error);
    }
}; 