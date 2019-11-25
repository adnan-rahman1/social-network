import React from 'react';
import Home from '../home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Home} />
        </Switch>
    </BrowserRouter>
);

export default Router;