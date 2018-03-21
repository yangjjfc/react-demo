import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';// 记录store日志
import history from '../router/history';
import { routerReducer, routerMiddleware} from 'react-router-redux';
import  * as user from './user/reduer';

const middleware = routerMiddleware(history);

let store = createStore(
    combineReducers({...user, router: routerReducer}),
    applyMiddleware(createLogger,thunk,middleware)
);
console.log(store.getState());

export default store;
