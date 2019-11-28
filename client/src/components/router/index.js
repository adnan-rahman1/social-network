import React from 'react';
import Home from '../home';
import Profile from "../user/profile";
import NavBar from "../nav";
import SignUp from "../signup";
import SignIn from "../signin";
import SignOut from "../signout";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Router = (props) => {
  const { isAuthenticate, user } = props;
  return (
    <BrowserRouter>
      <NavBar {...props} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={() => <Profile user={user} />} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={() => <SignIn isAuthenticate={isAuthenticate} />} />
        <Route path="/signout" component={() => <SignOut isAuthenticate={isAuthenticate} />} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router;