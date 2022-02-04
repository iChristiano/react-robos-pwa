import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration.js';
import App from './containers/app/App';
import { searchReducer, requestReducer, selectedRobotReducer, modalReducer, serviceWorkerReducer, onlineReducer } from './reducers';
import 'tachyons';
import { setSwInit, setSwUpdate } from './actions';

let middleware = [thunkMiddleware]
if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger();
    middleware = [...middleware, logger];
}

const rootReducer = combineReducers({ searchReducer, requestReducer, selectedRobotReducer, modalReducer, serviceWorkerReducer, onlineReducer});
const store = createStore(rootReducer, applyMiddleware(...middleware));

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
//serviceWorkerRegistration.register();
serviceWorkerRegistration.register({
    onSuccess: (registration) => {
        //console.log("registered app for offline use. details:", registration); 
        store.dispatch(setSwInit(registration));  
    },
    onUpdate: (registration) => {
        //console.log("update app for offline use. details:", registration); 
        store.dispatch(setSwUpdate(registration));
    }
});

