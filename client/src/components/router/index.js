import React from 'react';
import Home from '../home';
import SignUp from "../signup";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={SignUp} />
        </Switch>
    </BrowserRouter>
);

export default Router;