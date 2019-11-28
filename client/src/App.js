import React from 'react';
import Router from './components/router';
import isAuthenticated from "./r_components/user/auth.controller.";
import userProfile from "./r_components/user/profile.controller";

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      authenticate: false,
      user: {},
    }
  }

  isAuthenticate = (user, authenticate) => {
    this.setState({ user, authenticate })
  }

  componentDidMount = async () => {
    console.log("Calling from the app js...");
    const data = await isAuthenticated();
    this.setState({
      user: data.user,
      authenticate: data.admin,
    })
    // const userProfileInfo = await userProfile(authUser.id);
    // this.setState({ user: userProfileInfo });
    // console.log(userProfileInfo);
  }

  render() {
    return (
      <div>
        <Router
          {...this.state}
          isAuthenticate={this.isAuthenticate}
        />
      </div>
    )
  }
}

export default App;
