/**
 * axios basic configuration
 */
import axios from 'axios';
import Interceptor from './interceptor';
import store from '@/store';
const TimeOut = 10000;
// 初始化拦截器
new Interceptor(TimeOut); // eslint-disable-line no-new
/**
 * 基础配置
 * 更多配置请参考 https://github.com/axios/axios
 * @param {*} url  请求地址
 * @param {*} data  参数
 * @param {*} type  请求类型,默认post
 * @param {*} header 添加头部信息
 */
let Http = async (url, data = {}, header = {}, type = 'post') => {
    const { currentUserInfo } = store.getState();
    let headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'apiName': url,
        ...header
    };
    // 添加header token
    let token = currentUserInfo.token || '';
    if (token) {
        headers = Object.assign(headers, {'jtoken': token});
    }
    // 忽略防止重复请求
    if (data.ignoreRepeat) {
        headers.ignoreRepeat = true;
        delete data.ignoreRepeat;
    }
    let config = {
        url: url,
        method: type,
        data: data,
        timeout: TimeOut, // 超时时间
        headers: headers,
        responseType: 'json',
        validateStatus: function (status) {
            return status >= 200 && status < 300; // 默认的
        },
        maxRedirects: 5
    };
    let response = null;
    try {
        response = await axios(config);
    } catch (error) {
        response = Promise.reject(error);
    }
    return response;
};

export default Http;
