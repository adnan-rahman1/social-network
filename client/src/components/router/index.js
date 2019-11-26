import React from 'react';
import Home from '../home';
import NavBar from "../nav";
import SignUp from "../signup";
import SignIn from "../signin";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Router = () => (
    <BrowserRouter>
        <NavBar />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
        </Switch>
    </BrowserRouter>
);

export default Router;