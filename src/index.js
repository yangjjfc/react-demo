import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter} from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';
import Route from './router';
import history from './router/history';
import store from './store';
import '@basic';


const render = Component => {
    ReactDOM.render( 
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <AppContainer>
                    <Component />
                </AppContainer>
            </ConnectedRouter>    
        </Provider>,
        document.getElementById('root'),
    );
};
  
render(Route);
  
// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./router', () => {
        // if you are using harmony modules ({modules:false})
        render(Route);
    });
}
  
registerServiceWorker();
