import React from 'react';
import Router from './components/router';
import isAuthenticated from "./r_components/user/auth.controller.";

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      authenticate: false,
      user: {},
    }
  }

  setUser = (user) => {
    this.setState({ user });
  }

  isAuthenticate = (authenticate) => {
    this.setState({ authenticate })
  }

  componentDidMount = async () => {
    console.log("Calling from the app js...");
    const data = await isAuthenticated();
    this.isAuthenticate(data.admin);
    this.setUser(data.user);

  }

  render() {
    return (
      <div>
        <Router
          {...this.state}
          isAuthenticate={this.isAuthenticate}
          setUser={this.setUser}
        />
      </div>
    )
  }
}

export default App;
