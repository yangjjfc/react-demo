import Http from '~http';
import { USERINFO } from './action-types';

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