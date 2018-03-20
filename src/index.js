import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import Route from './router';
import store from './store';
import '@basic';

//
const render = Component => {
    ReactDOM.render( 
        <Provider store={store}>
            <AppContainer>
                <Component />
            </AppContainer>
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
