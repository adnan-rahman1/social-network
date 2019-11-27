import React from 'react';
import Home from '../home';
import NavBar from "../nav";
import SignUp from "../signup";
import SignIn from "../signin";
import SignOut from "../signout";
import { BrowserRouter, Route, Switch } from 'react-router-dom';


class  Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    }
  }
  componentDidMount = () => {
    console.log("Calling from the router js...");
  }

  isSignedOut = () => {
    this.setState({ isAuthenticated: false })
  }
  isSignedIn = () => {
    this.setState({ isAuthenticated: true })
  }

  render() {
    const { isAuthenticated } = this.state;
    return (
      <BrowserRouter>
        <NavBar isAuthenticated={isAuthenticated} isSignedIn={this.isSignedIn}/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={() => <SignIn isSignedIn={this.isSignedIn} />} />
          <Route path="/signout" component={() => <SignOut isSignedOut={this.isSignedOut} />} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Router;