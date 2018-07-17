import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';

import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.min.css';



import Routes from './Routes';


const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )

);

render(
    <Provider store={store}>
        <Routes/>
    </Provider>
    ,document.getElementById('app')
);