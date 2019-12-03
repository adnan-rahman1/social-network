import React from 'react';
import Home from '../home';
import Profile from "../user/profile";
import NavBar from "../nav";
import SignUp from "../signup";
import SignIn from "../signin";
import SignOut from "../signout";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Router = (props) => {
  return (
    <BrowserRouter>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />} />
        <Route path="/signout" component={SignOut} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router;