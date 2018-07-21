import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';

import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import setAuthorizationToken from './utils/setAuthorizationToken';
import {setCurrentUser} from './actions/authActions';
import jwtDecode from 'jwt-decode';

import 'bootstrap/dist/css/bootstrap.min.css';



import Routes from './Routes';


const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )

);

if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

render(
    <Provider store={store}>
        <Routes/>
    </Provider>
    ,document.getElementById('app')
);