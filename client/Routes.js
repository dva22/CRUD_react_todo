import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import App from './components/App';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';

export default () => (

    <Router>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/signup" component={SignupPage}/>
            <Route exact path="/login" component={LoginPage}/>
        </Switch>
    </Router>

);