import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';// 记录store日志
import  * as user from './user/reduer';

let store = createStore(
    combineReducers({...user}),
    applyMiddleware(createLogger,thunk)
);

export default store;
