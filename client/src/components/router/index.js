import React from 'react';
import Home from '../home';
import Profile from "../user/profile";
import NavBar from "../nav";
import SignUp from "../signup";
import SignIn from "../signin";
import SignOut from "../signout";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Router = (props) => {
  const { isAuthenticate, setUser, user } = props;
  return (
    <BrowserRouter>
      <NavBar {...props} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={() => <Profile user={user} setUser={setUser} />} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={() => <SignIn isAuthenticate={isAuthenticate} setUser={setUser} />} />
        <Route path="/signout" component={() => <SignOut isAuthenticate={isAuthenticate} setUser={setUser} />} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router;